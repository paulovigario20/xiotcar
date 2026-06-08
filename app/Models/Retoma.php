<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Retoma extends Model
{
    protected $fillable = [
        'marca',
        'modelo',
        'ano',
        'quilometragem',
        'contacto',
        'observacoes',
        'imagens',
        'lida',
    ];

    protected $casts = [
        'imagens' => 'array',
        'lida' => 'boolean',
    ];
}
