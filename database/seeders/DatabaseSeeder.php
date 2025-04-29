<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Brand;
use App\Models\Car;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Criação de utilizador Admin
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin1234'),
        ]);

        // Criação de marcas e carros
        Brand::factory(5)->create()->each(function ($brand) {
            Car::factory(10)->create([
                'brand_id' => $brand->id
            ]);
        });
    }
}