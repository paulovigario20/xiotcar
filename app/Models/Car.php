<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Car extends Model
{
    use SoftDeletes;

    protected $fillable = [
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

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
}
