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

        $result = $sync->sync();

        $this->info("Sincronizadas: {$result['synced']}");
        $this->info("Removidas: {$result['removed']}");

        return self::SUCCESS;
    }
}
