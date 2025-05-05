<?php

namespace App\Http\Controllers;

use App\Models\Retoma;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class RetomaController extends Controller
{
    public function store(Request $request)
{
    $data = $request->validate([
        'marca' => 'required|string|max:255',
        'modelo' => 'required|string|max:255',
        'ano' => 'required|integer',
        'quilometragem' => 'required|integer',
        'contacto' => 'required|string|max:255',
        'observacoes' => 'nullable|string',
        'imagens.*' => 'nullable|image|max:2048',
    ]);

    // Cria a retoma
    $retoma = Retoma::create($data);

    // Se houver imagens
    if ($request->hasFile('imagens')) {
        foreach ($request->file('imagens') as $imagem) {
            $path = $imagem->store('retomas', 'public');
            $retoma->imagens = $retoma->imagens 
                ? array_merge(json_decode($retoma->imagens, true), [$path]) 
                : [$path];
        }
        $retoma->imagens = json_encode($retoma->imagens);
        $retoma->save();
    }

    return redirect()->back()->with('success', 'Retoma enviada com sucesso!');
}

    public function index()
    {
        $retomas = Retoma::latest()->get();
    
        return Inertia::render('Dashboard', [
            'retomas' => $retomas,
        ]);
    }

    public function marcarComoLida(Retoma $retoma)
    {
        $retoma->update(['lida' => true]);

        return redirect()->back()->with('success', 'Retoma marcada como lida.');
    }
}
