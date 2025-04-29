<?php 

namespace App\Http\Controllers;

use App\Models\Brand;
use Inertia\Inertia;
use Illuminate\Http\Request;


class BrandController extends Controller
{
    public function index()
    {
        return Inertia::render('Brands/Index', [
            'brands' => Brand::all()
        ]);
    }
    public function create()
{
    return Inertia::render('Brands/Create');
}

public function store(Request $request)
{
    // Validar os dados da requisição
    $request->validate([
        'name' => 'required|string|max:255',
    ]);

    // Criar a marca
    try {
        Brand::create([
            'name' => $request->name,
        ]);
    } catch (\Exception $e) {
        // Logar o erro para diagnóstico
        \Log::error("Erro ao criar marca: " . $e->getMessage());
        return redirect()->back()->withErrors(['error' => 'Ocorreu um erro ao adicionar a marca.']);
    }

    // Redirecionar para a lista de marcas
    return redirect()->route('brands.index');
}
}

