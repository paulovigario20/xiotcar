<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Car;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class VehicleStockSeeder extends Seeder
{
    public function run(): void
    {
        $path = database_path('seeders/data/vehicle_stock.json');

        if (! is_file($path)) {
            return;
        }

        $vehicles = json_decode(file_get_contents($path), true);

        if (! is_array($vehicles)) {
            return;
        }

        foreach ($vehicles as $vehicle) {
            $brand = Brand::firstOrCreate(['name' => $vehicle['brand']]);

            $identity = [
                'brand_id' => $brand->id,
                'model' => $vehicle['model'],
                'year' => $vehicle['year'],
                'kilometers' => $vehicle['kilometers'],
            ];

            if (Car::where($identity)->exists()) {
                continue;
            }

            $imagePath = $this->resolveImage($vehicle);

            Car::create([
                ...$identity,
                'version' => $vehicle['version'] ?? null,
                'price' => $vehicle['price'] ?? 0,
                'fuel' => $vehicle['fuel'] ?? null,
                'transmission' => $vehicle['transmission'] ?? null,
                'description' => null,
                'image' => $imagePath,
                'extra_photos' => null,
                'is_sold' => (bool) ($vehicle['is_sold'] ?? false),
            ]);
        }
    }

    private function resolveImage(array $vehicle): ?string
    {
        $slug = $vehicle['slug'] ?? 'vehicle';
        $storagePath = "cars/stock/{$slug}.jpg";

        if (Storage::disk('public')->exists($storagePath)) {
            return $storagePath;
        }

        if (! empty($vehicle['image_url'])) {
            return $this->downloadImage($vehicle['image_url'], $storagePath);
        }

        if (! empty($vehicle['local_image'])) {
            return $this->copyLocalImage($vehicle['local_image'], $storagePath);
        }

        return null;
    }

    private function downloadImage(string $url, string $storagePath): ?string
    {
        try {
            $response = Http::timeout(20)->get($url);

            if (! $response->successful()) {
                Log::warning("VehicleStockSeeder: falha ao descarregar imagem {$url}");

                return null;
            }

            Storage::disk('public')->put($storagePath, $response->body());

            return $storagePath;
        } catch (\Throwable $e) {
            Log::warning("VehicleStockSeeder: erro ao descarregar imagem {$url}: {$e->getMessage()}");

            return null;
        }
    }

    private function copyLocalImage(string $relativePath, string $storagePath): ?string
    {
        $source = base_path($relativePath);

        if (! is_file($source)) {
            Log::warning("VehicleStockSeeder: imagem local em falta {$relativePath}");

            return null;
        }

        Storage::disk('public')->put($storagePath, file_get_contents($source));

        return $storagePath;
    }
}
