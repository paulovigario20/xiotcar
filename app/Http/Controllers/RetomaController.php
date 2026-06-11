<?php

namespace App\Http\Controllers;

use App\Mail\RetomaSubmetida;
use App\Models\Brand;
use App\Models\Car;
use App\Models\Retoma;
use App\Models\User;
use App\Services\WhatsAppNotifier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class RetomaController extends Controller
{
    public function index()
    {
        $retomas = Retoma::orderBy('created_at', 'desc')->get();

        return Inertia::render('Dashboard', [
            'retomas' => $retomas,
            'carsCount' => Car::count(),
            'brandsCount' => Brand::count(),
            'usersCount' => User::count(),
        ]);
    }

    public function store(Request $request, WhatsAppNotifier $whatsapp)
    {
        $data = $request->validate([
            'marca' => 'required|string',
            'modelo' => 'required|string',
            'ano' => 'required|integer',
            'km' => 'required|integer',
            'combustivel' => 'required|string',
            'telefone' => 'required|string',
            'observacoes' => 'nullable|string',
            'fotos.*' => 'nullable|image|max:5000',
        ]);

        $paths = [];
        if ($request->hasFile('fotos')) {
            foreach ($request->file('fotos') as $foto) {
                $paths[] = $foto->store('retomas', 'public');
            }
        }

        $observacoes = trim(
            "Combustível: {$data['combustivel']}"
            . ($data['observacoes'] ? "\n\n{$data['observacoes']}" : '')
        );

        Retoma::create([
            'marca' => $data['marca'],
            'modelo' => $data['modelo'],
            'ano' => $data['ano'],
            'quilometragem' => $data['km'],
            'contacto' => $data['telefone'],
            'observacoes' => $observacoes,
            'imagens' => $paths,
        ]);

        $mailData = [
            'marca' => $data['marca'],
            'modelo' => $data['modelo'],
            'ano' => $data['ano'],
            'km' => $data['km'],
            'combustivel' => $data['combustivel'],
            'telefone' => $data['telefone'],
            'observacoes' => $data['observacoes'] ?? '',
            'fotos' => $paths,
        ];

        try {
            Mail::to(config('mail.retoma_to', 'xiotecar@gmail.com'))->send(new RetomaSubmetida($mailData));
        } catch (\Throwable $e) {
            Log::error('Email de retoma não enviado: ' . $e->getMessage());
        }

        try {
            $whatsapp->sendRetomaNotification($mailData, !empty($paths));
        } catch (\Throwable $e) {
            Log::error('WhatsApp de retoma não enviado: ' . $e->getMessage());
        }

        return back()->with('success', 'Pedido de retoma enviado com sucesso!');
    }
}
