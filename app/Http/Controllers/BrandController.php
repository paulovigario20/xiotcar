<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Inertia\Inertia;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::withCount('cars')->get();
        return Inertia::render('Brands/Index', [
            'brands' => $brands,
        ]);
    }

    public function create()
    {
        return Inertia::render('Brands/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:brands,name',
            'logo_url' => 'nullable|string|max:255',
        ]);

        Brand::create($request->only('name', 'logo_url'));

        return redirect()->route('brands.index');
    }

    public function edit(Brand $brand)
    {
        return Inertia::render('Brands/Edit', [
            'brand' => $brand,
        ]);
    }

    public function update(Request $request, Brand $brand)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:brands,name,' . $brand->id,
            'logo_url' => 'nullable|string|max:255',
        ]);

        $brand->update($request->only('name', 'logo_url'));

        return redirect()->route('brands.index');
    }

    public function destroy(Brand $brand)
    {
        if ($brand->cars()->count() > 0) {
            return back()->withErrors(['error' => 'Não é possível eliminar uma marca com carros associados.']);
        }
        $brand->delete();
        return redirect()->route('brands.index');
    }
}
