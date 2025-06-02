<?php

namespace App\Http\Controllers;

use App\Models\Testemunho;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestemunhoController extends Controller
{
    /**
     * Salva um novo testemunho enviado pelo cliente.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'mensagem' => 'required|string|max:1000',
        ]);

        Testemunho::create([
            'nome' => $request->nome,
            'mensagem' => $request->mensagem,
        ]);

        return redirect()->back()->with('success', 'Testemunho enviado com sucesso!');
    }

    /**
     * Exibe a página inicial com os testemunhos.
     */
    public function index()
    {
        return Inertia::render('Site/Home', [
            'testemunhos' => Testemunho::latest()->take(10)->get()
        ]);
    }
}