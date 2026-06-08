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

    public function getKeyHint(): ?string
    {
        $key = $this->getApiKey();

        if ($key === '') {
            return null;
        }

        return str_repeat('•', max(0, strlen($key) - 4)) . substr($key, -4);
    }

    public function getPhone(): string
    {
        return $this->envValue('WHATSAPP_PHONE')
            ?? config('services.whatsapp.phone')
            ?? '351933188588';
    }

    private function getApiKey(): string
    {
        $key = $this->envValue('CALLMEBOT_API_KEY')
            ?? config('services.whatsapp.callmebot_api_key');

        return $key ? trim((string) $key) : '';
    }

    private function envValue(string $key): ?string
    {
        $value = $_ENV[$key] ?? $_SERVER[$key] ?? getenv($key);

        if ($value === false || $value === null || $value === '') {
            return null;
        }

        return trim((string) $value);
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
