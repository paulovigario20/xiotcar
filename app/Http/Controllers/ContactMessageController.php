<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Services\WhatsAppNotifier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    public function index(WhatsAppNotifier $whatsapp)
    {
        return Inertia::render('ContactMessages/Index', [
            'mensagens' => ContactMessage::query()
                ->orderByDesc('created_at')
                ->get(),
            'whatsappConfigured' => $whatsapp->isConfigured(),
            'whatsappKeyHint' => $whatsapp->getKeyHint(),
            'whatsappPhone' => $whatsapp->getPhone(),
        ]);
    }

    public function updateSettings(Request $request, WhatsAppNotifier $whatsapp)
    {
        $data = $request->validate([
            'callmebot_api_key' => 'required|string|min:4',
            'whatsapp_phone' => 'nullable|string|max:20',
        ]);

        $whatsapp->saveSettings(
            $data['callmebot_api_key'],
            $data['whatsapp_phone'] ?? '351933188588'
        );

        $sent = $whatsapp->send('Teste XiotCar — WhatsApp configurado com sucesso no backoffice.');

        if ($sent) {
            return back()->with('success', 'WhatsApp configurado! Mensagem de teste enviada.');
        }

        return back()->with('error', $whatsapp->getLastError() ?? 'Chave guardada mas o teste falhou. Verifique se ativou o CallMeBot no telemóvel +351 933 188 588.');
    }

    public function resend(ContactMessage $mensagem, WhatsAppNotifier $whatsapp)
    {
        $sent = $whatsapp->sendContactMessage($mensagem);

        if ($sent) {
            return back()->with('success', 'Mensagem reenviada para o WhatsApp.');
        }

        return back()->with(
            'error',
            $whatsapp->getLastError() ?? 'Não foi possível enviar para o WhatsApp.'
        );
    }

    public function destroy(ContactMessage $mensagem)
    {
        $mensagem->delete();

        return back()->with('success', 'Mensagem eliminada.');
    }
}
