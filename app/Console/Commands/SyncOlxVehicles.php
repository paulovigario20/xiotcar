<?php

namespace App\Console\Commands;

use App\Services\OlxSyncService;
use Illuminate\Console\Command;

class SyncOlxVehicles extends Command
{
    protected $signature = 'olx:sync {--prune : Apagar viaturas OLX que já não existem no anúncio}';

    protected $description = 'Importa viaturas da OLX (não apaga viaturas do backoffice por defeito)';

    public function handle(OlxSyncService $sync): int
    {
        $this->info('A sincronizar viaturas da OLX...');

        try {
            $result = $sync->sync(prune: $this->option('prune'));
        } catch (\Throwable $e) {
            $this->error('Falha na sincronização OLX: ' . $e->getMessage());

            return self::FAILURE;
        }

        $this->info("Sincronizadas: {$result['synced']}");

        if ($this->option('prune')) {
            $this->info("Removidas: {$result['removed']}");
        } else {
            $this->comment('Viaturas do backoffice mantidas (use --prune para remover anúncios OLX inativos).');
        }

        return self::SUCCESS;
    }
}
