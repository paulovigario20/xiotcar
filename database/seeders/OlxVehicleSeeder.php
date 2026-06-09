<?php

namespace Database\Seeders;

use App\Services\OlxSyncService;
use Illuminate\Database\Seeder;

class OlxVehicleSeeder extends Seeder
{
    public function run(): void
    {
        app(OlxSyncService::class)->sync(prune: false);
    }
}
