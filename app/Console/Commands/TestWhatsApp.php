<?php

namespace App\Console\Commands;

use App\Services\WhatsAppNotifier;
use Illuminate\Console\Command;

class TestWhatsApp extends Command
{
    protected $signature = 'whatsapp:test';

    protected $description = 'Envia mensagem de teste via CallMeBot WhatsApp';

    public function handle(WhatsAppNotifier $whatsapp): int
    {
        if (!$whatsapp->isConfigured()) {
            $this->error('CALLMEBOT_API_KEY não está configurada.');
            $this->line('');
            $this->line('Configuração no Railway:');
            $this->line('  1. Adiciona +34 644 10 28 72 aos contactos (CallMeBot)');
            $this->line('  2. Envia no WhatsApp: I allow callmebot to send me messages');
            $this->line('  3. Copia a API key recebida para CALLMEBOT_API_KEY no Railway');
            $this->line('  4. Define WHATSAPP_PHONE=351933188588 (telemóvel que recebe)');

            return self::FAILURE;
        }

        $this->info('A enviar mensagem de teste...');

        $sent = $whatsapp->send('Teste XiotCar — notificações WhatsApp configuradas com sucesso.');

        if ($sent) {
            $this->info('Mensagem enviada! Verifica o WhatsApp.');

            return self::SUCCESS;
        }

        $this->error('Falha no envio. Consulta storage/logs/laravel.log');

        return self::FAILURE;
    }
}
