<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Car;
use Illuminate\Database\Seeder;

class OlxVehicleSeeder extends Seeder
{
    public function run(): void
    {
        $vehicles = json_decode(file_get_contents(__DIR__.'/data/olx_vehicles.json'), true, flags: JSON_THROW_ON_ERROR);

        foreach ($vehicles as $vehicle) {
            $brand = Brand::firstOrCreate(['name' => $vehicle['brand']]);

            Car::updateOrCreate(
                [
                    'brand_id' => $brand->id,
                    'model' => $vehicle['model'],
                    'year' => $vehicle['year'],
                    'kilometers' => $vehicle['kilometers'],
                ],
                [
                    'version' => $vehicle['version'],
                    'price' => $vehicle['price'],
                    'fuel' => $vehicle['fuel'],
                    'transmission' => $vehicle['transmission'],
                    'power' => $vehicle['power'],
                    'color' => $vehicle['color'],
                    'doors' => $vehicle['doors'],
                    'engine_capacity' => $vehicle['engine_capacity'],
                    'description' => $vehicle['description'],
                    'image' => $vehicle['image'],
                    'extra_photos' => $vehicle['extra_photos'],
                    'features' => $vehicle['features'],
                    'is_sold' => false,
                ]
            );
        }
    }
}
