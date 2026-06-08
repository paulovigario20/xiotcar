<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    protected $fillable = [
        'nome',
        'email',
        'mensagem',
        'whatsapp_sent',
    ];

    protected $casts = [
        'whatsapp_sent' => 'boolean',
    ];
}
