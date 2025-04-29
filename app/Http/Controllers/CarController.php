<?php 

namespace App\Http\Controllers;

use App\Models\Car;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Brand;


class CarController extends Controller
{
    public function index()
    {
        $cars = Car::with('brand')->get();

        return Inertia::render('Cars/Index', [
            'cars' => $cars
        ]);
    }

    public function create()
{
    $brands = Brand::all(); // Lista todas as marcas
    return Inertia::render('Cars/Create', [
        'brands' => $brands,
    ]);
}

public function store(Request $request)
{
    // Validar os dados
    $request->validate([
        'model' => 'required|string|max:255',
        'year' => 'required|integer',
        'brand_id' => 'required|exists:brands,id',
    ]);

    // Criar o carro
    try {
        Car::create([
            'model' => $request->model,
            'year' => $request->year,
            'brand_id' => $request->brand_id,
        ]);
    } catch (\Exception $e) {
        // Logar o erro
        \Log::error("Erro ao criar carro: " . $e->getMessage());
        return redirect()->back()->withErrors(['error' => 'Ocorreu um erro ao adicionar o carro.']);
    }

    // Redirecionar para a lista de carros
    return redirect()->route('cars.index');
}
}