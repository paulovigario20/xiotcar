<?php

use App\Models\Car;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private const OLX_FEATURE_KEYS = [
        'olx_id',
        'source_url',
        'external_url',
    ];

    public function up(): void
    {
        if (!Schema::hasColumn('cars', 'olx_id')) {
            return;
        }

        Car::query()->each(function (Car $car) {
            $features = collect($car->features ?? [])
                ->except(self::OLX_FEATURE_KEYS)
                ->filter(fn ($value) => $value !== null && $value !== '')
                ->all();

            $car->update([
                'olx_id' => null,
                'features' => $features ?: null,
            ]);
        });
    }

    public function down(): void
    {
        // Ligação OLX removida de forma irreversível.
    }
};
