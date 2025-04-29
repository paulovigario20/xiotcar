<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Car;

class SiteController extends Controller
{
    public function home()
    {
        return inertia('Site/Home');
    }

    public function carros()
    {
        $cars = Car::with('brand')->get();
        return inertia('Site/Carros', [
            'cars' => $cars,
        ]);
    }

    public function sobre()
    {
        return inertia('Site/Sobre');
    }
}
