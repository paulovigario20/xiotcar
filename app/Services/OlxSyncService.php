<?php

namespace App\Services;

use App\Models\Brand;
use App\Models\Car;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class OlxSyncService
{
    private const OLX_USER_UUID = '1ade5816-19a1-4f58-9364-bd9049daf540';

    private const OLX_CATEGORY_ID = 362;

    private const MULTI_WORD_BRANDS = [
        'Mercedes-Benz',
        'Land Rover',
        'Alfa Romeo',
        'Aston Martin',
    ];

    public function sync(): array
    {
        $offers = $this->fetchOffers();
        $syncedIds = [];

        foreach ($offers as $offer) {
            $olxId = (int) $offer['id'];
            $syncedIds[] = $olxId;

            $parsed = $this->parseOffer($offer);
            $images = $this->downloadImages($olxId, $offer['photos'] ?? []);

            $brand = Brand::firstOrCreate(['name' => $parsed['brand']]);

            Car::updateOrCreate(
                ['olx_id' => $olxId],
                array_merge($parsed, [
                    'brand_id' => $brand->id,
                    'image' => $images['main'],
                    'extra_photos' => $images['extras'],
                    'is_sold' => false,
                ])
            );
        }

        $removed = Car::query()
            ->where(function ($query) use ($syncedIds) {
                $query->whereNull('olx_id')
                    ->orWhereNotIn('olx_id', $syncedIds);
            })
            ->delete();

        return [
            'synced' => count($syncedIds),
            'removed' => $removed,
        ];
    }

    private function fetchOffers(): array
    {
        $response = Http::withHeaders([
            'User-Agent' => 'Mozilla/5.0 (compatible; XiotecarSync/1.0)',
            'Accept' => 'application/json',
        ])->get('https://www.olx.pt/api/v1/offers', [
            'offset' => 0,
            'limit' => 50,
            'category_id' => self::OLX_CATEGORY_ID,
            'sort_by' => 'created_at:desc',
            'user_id' => self::OLX_USER_UUID,
        ]);

        $response->throw();

        return $response->json('data', []);
    }

    private function parseOffer(array $offer): array
    {
        $params = collect($offer['params'] ?? [])->keyBy('key');

        $price = (int) data_get($params->get('price'), 'value.value', data_get($params->get('price'), 'value', 0));
        $year = (int) data_get($params->get('year'), 'value.key', data_get($params->get('year'), 'value.label', 0));
        $km = (int) data_get($params->get('quilometros'), 'value.key', 0);
        $model = trim((string) data_get($params->get('modelo'), 'value.label', data_get($params->get('modelo'), 'value.key', '')));
        $power = (int) data_get($params->get('engine_power'), 'value.key', 0);
        $engineCapacity = trim((string) data_get($params->get('engine_capacity'), 'value.label', data_get($params->get('engine_capacity'), 'value.key', '')));
        $doorsRaw = (string) data_get($params->get('portas'), 'value.key', '');
        $doors = (int) preg_replace('/\D/', '', $doorsRaw) ?: null;

        return [
            'model' => $model ?: $this->fallbackModel($offer['title']),
            'version' => $offer['title'],
            'year' => $year ?: (int) date('Y'),
            'price' => $price,
            'kilometers' => $km ?: null,
            'fuel' => $this->mapFuel(data_get($params->get('combustivel'), 'value.label')),
            'transmission' => $this->mapTransmission(data_get($params->get('gearbox'), 'value.label')),
            'power' => $power ?: null,
            'doors' => $doors,
            'engine_capacity' => $engineCapacity ?: null,
            'description' => $offer['description'] ?? null,
            'brand' => $this->extractBrand($offer['title']),
        ];
    }

    private function extractBrand(string $title): string
    {
        foreach (self::MULTI_WORD_BRANDS as $brand) {
            if (Str::startsWith(Str::lower($title), Str::lower($brand))) {
                return $brand;
            }
        }

        $first = explode(' ', trim($title))[0] ?? 'Outros';

        return match (Str::upper($first)) {
            'VW' => 'Volkswagen',
            'KTM' => 'KTM',
            'MERCEDES-BENZ' => 'Mercedes-Benz',
            default => Str::title(Str::lower($first)),
        };
    }

    private function fallbackModel(string $title): string
    {
        $parts = preg_split('/\s+/', trim($title));

        return $parts[1] ?? ($parts[0] ?? 'Modelo');
    }

    private function mapFuel(?string $label): ?string
    {
        return match ($label) {
            'Gasolina' => 'Gasolina',
            'Diesel' => 'Diesel',
            'Eléctrico', 'Elétrico' => 'Elétrico',
            'Híbrido Plug-in' => 'Híbrido Plug-in',
            'Híbrido' => 'Híbrido',
            default => $label,
        };
    }

    private function mapTransmission(?string $label): ?string
    {
        return match ($label) {
            'Automática' => 'Automática',
            'Manual' => 'Manual',
            default => $label ?: null,
        };
    }

    private function downloadImages(int $olxId, array $photos): array
    {
        $main = null;
        $extras = [];

        foreach ($photos as $index => $photo) {
            $url = $this->resolvePhotoUrl($photo['link'] ?? null);
            if (!$url) {
                continue;
            }

            $path = "cars/{$olxId}_{$index}.jpg";

            try {
                $response = Http::timeout(30)->get($url);
                if (!$response->successful()) {
                    continue;
                }

                Storage::disk('public')->put($path, $response->body());

                if ($index === 0) {
                    $main = $path;
                } else {
                    $extras[] = $path;
                }
            } catch (\Throwable) {
                continue;
            }
        }

        if (!$main && !empty($extras)) {
            $main = array_shift($extras);
        }

        return [
            'main' => $main,
            'extras' => $extras,
        ];
    }

    private function resolvePhotoUrl(?string $link): ?string
    {
        if (!$link) {
            return null;
        }

        return str_replace('s={width}x{height}', 's=1600x1200', $link);
    }
}
