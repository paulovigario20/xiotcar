<?php

namespace App\Services;

use App\Models\ContactMessage;
use App\Models\Setting;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppNotifier
{
    private ?string $lastError = null;

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
        $this->lastError = null;
        $apiKey = $this->getApiKey();

        if ($apiKey === '') {
            $this->lastError = 'API key não configurada. Cole a chave CallMeBot no formulário abaixo.';

            Log::warning('WhatsApp: API key não configurada.');

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
                $this->lastError = $body ?: 'CallMeBot rejeitou o pedido (HTTP ' . $response->status() . ')';

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
            $this->lastError = $e->getMessage();

            Log::error('WhatsApp CallMeBot exceção: ' . $e->getMessage());

            return false;
        }
    }

    public function getLastError(): ?string
    {
        return $this->lastError;
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
        $phone = Setting::get('whatsapp_phone');

        if ($phone) {
            return $phone;
        }

        return $this->envValue('WHATSAPP_PHONE')
            ?? config('services.whatsapp.phone')
            ?? '351933188588';
    }

    public function saveSettings(?string $apiKey, ?string $phone): void
    {
        if ($apiKey !== null) {
            Setting::set('callmebot_api_key', trim($apiKey) ?: null);
        }

        if ($phone !== null) {
            Setting::set('whatsapp_phone', preg_replace('/\D/', '', $phone) ?: null);
        }
    }

    private function getApiKey(): string
    {
        $dbKey = Setting::get('callmebot_api_key');

        if ($dbKey) {
            return trim($dbKey);
        }

        $key = $this->envValue('CALLMEBOT_API_KEY')
            ?? config('services.whatsapp.callmebot_api_key');

        return $key ? trim((string) $key) : '';
    }

    private function envValue(string $key): ?string
    {
        $candidates = [getenv($key), $_SERVER[$key] ?? null, $_ENV[$key] ?? null];

        foreach ($candidates as $value) {
            if ($value !== false && $value !== null && trim((string) $value) !== '') {
                return trim((string) $value);
            }
        }

        return null;
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
