<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Car>
 */
class CarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'brand_id' => \App\Models\Brand::factory(),
            'model' => $this->faker->word(),
            'year' => $this->faker->numberBetween(2000, 2024),
            'price' => $this->faker->randomFloat(2, 5000, 50000),
            'description' => $this->faker->paragraph(),
            'image' => $this->faker->imageUrl(640, 480, 'cars'),
            'is_sold' => $this->faker->boolean(20),
        ];
    }
}
