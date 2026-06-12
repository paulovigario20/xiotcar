<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        $names = [
            'Audi', 'BMW', 'Citroën', 'Dacia', 'Fiat', 'Ford', 'Honda', 'Hyundai',
            'Kia', 'Mazda', 'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Opel', 'Peugeot',
            'Renault', 'Seat', 'Skoda', 'Smart', 'Toyota', 'Volkswagen', 'Volvo',
            'Jeep', 'KTM', 'Tesla', 'Polestar', 'Cupra', 'Land Rover', 'Alfa Romeo', 'Mini',
        ];

        foreach ($names as $name) {
            Brand::firstOrCreate(['name' => $name]);
        }
    }
}
