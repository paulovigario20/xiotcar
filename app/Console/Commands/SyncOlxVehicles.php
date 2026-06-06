<?php

namespace App\Console\Commands;

use App\Services\OlxSyncService;
use Illuminate\Console\Command;

class SyncOlxVehicles extends Command
{
    protected $signature = 'olx:sync';

    protected $description = 'Sincroniza viaturas a partir do anunciante OLX Xiotecar';

    public function handle(OlxSyncService $sync): int
    {
        $this->info('A sincronizar viaturas da OLX...');

        try {
            $result = $sync->sync();
        } catch (\Throwable $e) {
            $this->error('Falha na sincronização OLX: ' . $e->getMessage());

            return self::FAILURE;
        }

        $this->info("Sincronizadas: {$result['synced']}");
        $this->info("Removidas: {$result['removed']}");

        return self::SUCCESS;
    }
}
