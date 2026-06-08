<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Services\WhatsAppNotifier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactoController extends Controller
{
    public function index()
    {
        return Inertia::render('Site/Contacto');
    }

    public function store(Request $request, WhatsAppNotifier $whatsapp)
    {
        $data = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email',
            'mensagem' => 'required|string|max:5000',
        ]);

        $message = ContactMessage::create($data);
        $whatsapp->sendContactMessage($message);

        return redirect()->route('Contacto.index')->with('success', 'Mensagem enviada com sucesso!');
    }
}
