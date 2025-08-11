<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContactoController extends Controller
{
    public function index()
    {
        return view('contacto');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email',
            'mensagem' => 'required|string',
        ]);

        // Aqui podes enviar por email ou guardar na BD
        // Mail::to('teuemail@exemplo.com')->send(new ContactFormMail($request->all()));

        return redirect()->route('contacto.index')->with('success', 'Mensagem enviada com sucesso!');
    }
}