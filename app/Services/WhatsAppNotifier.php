<?php

namespace App\Services;

use App\Models\ContactMessage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppNotifier
{
    public function sendContactMessage(ContactMessage $message): bool
    {
        $text = "*Nova mensagem do site XiotCar*\n\n"
            . "*Nome:* {$message->nome}\n"
            . "*Email:* {$message->email}\n\n"
            . "*Mensagem:*\n{$message->mensagem}";

        $sent = $this->send($text);

        $message->update(['whatsapp_sent' => $sent]);

        return $sent;
    }

    public function send(string $text): bool
    {
        $apiKey = $this->getApiKey();

        if ($apiKey === '') {
            Log::warning('WhatsApp: CALLMEBOT_API_KEY não configurada no Railway. Mensagem guardada apenas no site.');

            return false;
        }

        $phone = $this->formatPhone($this->getPhone());

        try {
            $response = Http::timeout(20)->get('https://api.callmebot.com/whatsapp.php', [
                'phone' => $phone,
                'text' => $text,
                'apikey' => $apiKey,
            ]);

            $body = strip_tags($response->body());

            if ($this->responseIndicatesFailure($response->status(), $body)) {
                Log::error('WhatsApp CallMeBot falhou', [
                    'status' => $response->status(),
                    'body' => $body,
                    'phone' => $phone,
                ]);

                return false;
            }

            Log::info('WhatsApp CallMeBot enviado com sucesso', ['phone' => $phone]);

            return true;
        } catch (\Throwable $e) {
            Log::error('WhatsApp CallMeBot exceção: ' . $e->getMessage());

            return false;
        }
    }

    public function isConfigured(): bool
    {
        return $this->getApiKey() !== '';
    }

    private function getApiKey(): string
    {
        $key = config('services.whatsapp.callmebot_api_key');

        if ($key) {
            return trim((string) $key);
        }

        $env = getenv('CALLMEBOT_API_KEY');

        return $env ? trim((string) $env) : '';
    }

    private function getPhone(): string
    {
        $phone = config('services.whatsapp.phone');

        if ($phone) {
            return (string) $phone;
        }

        $env = getenv('WHATSAPP_PHONE');

        return $env ? (string) $env : '351933188588';
    }

    private function formatPhone(string $phone): string
    {
        $digits = preg_replace('/\D/', '', $phone);

        return '+' . $digits;
    }

    private function responseIndicatesFailure(int $status, string $body): bool
    {
        if ($status < 200 || $status >= 300) {
            return true;
        }

        $lower = strtolower($body);

        return str_contains($lower, 'error')
            || str_contains($lower, 'invalid')
            || str_contains($lower, 'not activated');
    }
}
