<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    public function index()
    {
        return Inertia::render('ContactMessages/Index', [
            'mensagens' => ContactMessage::query()
                ->orderByDesc('created_at')
                ->get(),
        ]);
    }

    public function destroy(ContactMessage $mensagem)
    {
        $mensagem->delete();

        return back()->with('success', 'Mensagem eliminada.');
    }
}
