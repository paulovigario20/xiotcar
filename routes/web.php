<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CarController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\RetomaController;
use App\Http\Controllers\TestemunhoController;
use App\Http\Controllers\ContactoController;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/brands', [BrandController::class, 'index'])->name('brands.index');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/cars', [CarController::class, 'index'])->name('cars.index');
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/**
 * ROTAS PARA CARROS**/
Route::get('/cars/create', [CarController::class, 'create'])->name('cars.create');
Route::post('/cars', [CarController::class, 'store'])->name('cars.store');


Route::get('/brands/create', [BrandController::class, 'create'])->name('brands.create');
Route::post('/brands', [BrandController::class, 'store'])->name('brands.store');


Route::get('/', [SiteController::class, 'home'])->name('site.home');
Route::get('/carros', [SiteController::class, 'carros'])->name('site.carros');
Route::get('/sobre', [SiteController::class, 'sobre'])->name('site.sobre');

Route::post('/retomas', [RetomaController::class, 'store']);
Route::get('/dashboard/retomas', [RetomaController::class, 'index'])->middleware(['auth', 'admin']);
Route::get('/dashboard', [RetomaController::class, 'index'])->middleware(['auth'])->name('dashboard');

Route::get('/carros/{car}', [CarController::class, 'show'])->name('carros.show');

Route::get('/contacto', [ContactoController::class, 'index'])->name('contacto.index');
Route::post('/contacto', [ContactoController::class, 'store'])->name('contacto.store');

Route::post('/testemunhos', [TestemunhoController::class, 'store']);

require __DIR__.'/auth.php';
