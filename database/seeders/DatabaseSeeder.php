<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@xiotecar.pt'],
            [
                'name' => 'Admin Xiotecar',
                'password' => Hash::make('Xiote2018@'),
                'email_verified_at' => now(),
            ]
        );

        $this->call(BrandSeeder::class);

        // Viaturas geridas exclusivamente pelo backoffice (/cars)
    }
}