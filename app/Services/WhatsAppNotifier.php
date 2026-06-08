<?php

namespace App\Services;

use App\Models\ContactMessage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppNotifier
{
    public function sendContactMessage(ContactMessage $message): bool
    {
        $text = "📩 Nova mensagem do site XiotCar\n\n"
            . "Nome: {$message->nome}\n"
            . "Email: {$message->email}\n\n"
            . "Mensagem:\n{$message->mensagem}";

        $sent = $this->send($text);

        if ($sent) {
            $message->update(['whatsapp_sent' => true]);
        }

        return $sent;
    }

    public function send(string $text): bool
    {
        $apiKey = config('services.whatsapp.callmebot_api_key');
        $phone = preg_replace('/\D/', '', config('services.whatsapp.phone', '351933188588'));

        if (!$apiKey) {
            Log::warning('WhatsApp: CALLMEBOT_API_KEY não configurada. Mensagem não enviada.');

            return false;
        }

        try {
            $response = Http::timeout(15)->get('https://api.callmebot.com/whatsapp.php', [
                'phone' => $phone,
                'text' => $text,
                'apikey' => $apiKey,
            ]);

            if (!$response->successful()) {
                Log::error('WhatsApp CallMeBot falhou', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return false;
            }

            return true;
        } catch (\Throwable $e) {
            Log::error('WhatsApp CallMeBot exceção: ' . $e->getMessage());

            return false;
        }
    }
}
