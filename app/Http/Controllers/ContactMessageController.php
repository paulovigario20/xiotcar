<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Services\WhatsAppNotifier;
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

    public function resend(ContactMessage $mensagem, WhatsAppNotifier $whatsapp)
    {
        $sent = $whatsapp->sendContactMessage($mensagem);

        return back()->with(
            $sent ? 'success' : 'error',
            $sent ? 'Mensagem reenviada para o WhatsApp.' : 'Não foi possível enviar para o WhatsApp. Verifique CALLMEBOT_API_KEY no Railway.'
        );
    }

    public function destroy(ContactMessage $mensagem)
    {
        $mensagem->delete();

        return back()->with('success', 'Mensagem eliminada.');
    }
}
