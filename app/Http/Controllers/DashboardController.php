<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Brand;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'carsCount' => Car::count(),
            'brandsCount' => Brand::count(),
            'usersCount' => User::count(),
        ]);
    }
}