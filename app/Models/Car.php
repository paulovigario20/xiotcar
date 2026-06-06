<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Car extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'olx_id',
        'brand_id',
        'model',
        'version',
        'year',
        'price',
        'description',
        'image',
        'extra_photos',
        'is_sold',
        'kilometers',
        'fuel',
        'transmission',
        'power',
        'color',
        'doors',
        'engine_capacity',
        'features',
    ];

    protected $casts = [
        'features' => 'array',
        'extra_photos' => 'array',
        'is_sold' => 'boolean',
    ];

    protected $appends = [
        'image_url',
        'extra_photo_urls',
    ];

    public function getImageUrlAttribute(): ?string
    {
        return $this->resolveMediaUrl($this->image);
    }

    public function getExtraPhotoUrlsAttribute(): array
    {
        return collect($this->extra_photos ?? [])
            ->map(fn ($photo) => $this->resolveMediaUrl($photo))
            ->filter()
            ->values()
            ->all();
    }

    protected function resolveMediaUrl(?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        return asset('storage/' . ltrim($path, '/'));
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
}
