<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Brand;
use Illuminate\Support\Facades\Storage;

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
        $brands = Brand::all();
        return Inertia::render('Cars/Create', [
            'brands' => $brands,
        ]);
    }

    public function show(Car $car)
    {
        return Inertia::render('CarroDetalhes', [
            'carro' => $car->load('brand'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'model' => 'required|string|max:255',
            'year' => 'required|integer',
            'brand_id' => 'required|exists:brands,id',
            'price' => 'required|numeric|min:0',
            'kilometers' => 'nullable|integer',
            'fuel' => 'nullable|string',
            'transmission' => 'nullable|string',
            'power' => 'nullable|integer',
            'description' => 'nullable|string',
            'photos' => 'nullable|array',
            'photos.*' => 'image|max:5120',
        ]);

        $imagePath = null;
        $extraPhotos = [];

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $i => $file) {
                $path = $file->store('cars', 'public');
                if ($i === 0) {
                    $imagePath = $path;
                } else {
                    $extraPhotos[] = $path;
                }
            }
        }

        Car::create([
            'model' => $request->model,
            'year' => $request->year,
            'brand_id' => $request->brand_id,
            'price' => $request->price,
            'kilometers' => $request->kilometers,
            'fuel' => $request->fuel,
            'transmission' => $request->transmission,
            'power' => $request->power,
            'description' => $request->description,
            'image' => $imagePath,
            'extra_photos' => $extraPhotos ?: null,
        ]);

        return redirect()->route('cars.index');
    }

    public function edit(Car $car)
    {
        $brands = Brand::all();
        return Inertia::render('Cars/Edit', [
            'car' => $car,
            'brands' => $brands,
        ]);
    }

    public function update(Request $request, Car $car)
    {
        $request->validate([
            'model' => 'required|string|max:255',
            'year' => 'required|integer',
            'brand_id' => 'required|exists:brands,id',
            'price' => 'required|numeric|min:0',
            'kilometers' => 'nullable|integer',
            'fuel' => 'nullable|string',
            'transmission' => 'nullable|string',
            'power' => 'nullable|integer',
            'description' => 'nullable|string',
            'is_sold' => 'nullable|boolean',
            'photos' => 'nullable|array',
            'photos.*' => 'image|max:5120',
        ]);

        $data = $request->only([
            'model', 'year', 'brand_id', 'price', 'kilometers',
            'fuel', 'transmission', 'power', 'description',
        ]);
        $data['is_sold'] = $request->boolean('is_sold');

        if ($request->hasFile('photos')) {
            $this->deleteCarPhotos($car);

            $extraPhotos = [];
            foreach ($request->file('photos') as $i => $file) {
                $path = $file->store('cars', 'public');
                if ($i === 0) {
                    $data['image'] = $path;
                } else {
                    $extraPhotos[] = $path;
                }
            }

            $data['extra_photos'] = $extraPhotos ?: null;
        }

        $car->update($data);

        return redirect()->route('cars.index');
    }

    public function destroy(Car $car)
    {
        $this->deleteCarPhotos($car);
        $car->delete();

        return redirect()->route('cars.index');
    }

    private function deleteCarPhotos(Car $car): void
    {
        if ($car->image) {
            Storage::disk('public')->delete($car->image);
        }

        foreach ($this->storedExtraPhotos($car) as $photo) {
            Storage::disk('public')->delete($photo);
        }
    }

    /**
     * @return array<int, string>
     */
    private function storedExtraPhotos(Car $car): array
    {
        $extras = $car->extra_photos ?? [];

        if (empty($extras) && is_array($car->features['extra_photos'] ?? null)) {
            $extras = $car->features['extra_photos'];
        }

        return $extras;
    }
}
