<?php

namespace App\Console\Commands;

use App\Models\Car;
use App\Services\OlxSyncService;
use Illuminate\Console\Command;

class EnsureVehiclesLoaded extends Command
{
    protected $signature = 'vehicles:ensure';

    protected $description = 'Restaura viaturas da OLX apenas se a base de dados estiver vazia';

    public function handle(OlxSyncService $sync): int
    {
        if (Car::count() > 0) {
            $this->comment('Base de dados já tem ' . Car::count() . ' viaturas. Nada a fazer.');

            return self::SUCCESS;
        }

        $this->warn('Nenhuma viatura na base de dados. A importar da OLX...');

        try {
            $result = $sync->sync(prune: false);
        } catch (\Throwable $e) {
            $this->error('Falha ao restaurar viaturas: ' . $e->getMessage());

            return self::FAILURE;
        }

        $this->info("Restauradas {$result['synced']} viaturas.");

        return self::SUCCESS;
    }
}
