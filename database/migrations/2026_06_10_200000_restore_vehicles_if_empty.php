<?php

use App\Models\Car;
use App\Services\OlxSyncService;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
    public function up(): void
    {
        if (Car::count() > 0) {
            return;
        }

        try {
            $result = app(OlxSyncService::class)->sync(prune: false);
            Log::info('Viaturas restauradas na migração.', $result);
        } catch (\Throwable $e) {
            Log::error('Falha ao restaurar viaturas na migração: ' . $e->getMessage());
        }
    }

    public function down(): void
    {
        //
    }
};
