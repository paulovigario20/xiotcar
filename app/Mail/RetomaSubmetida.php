<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RetomaSubmetida extends Mailable
{
    use Queueable, SerializesModels;

    public $dados;

    public function __construct($dados)
    {
        $this->dados = $dados;
    }

    public function build()
    {
        $email = $this->subject('📩 Nova Pedido de Retoma')
            ->view('emails.retoma');

        // Anexar fotos se existirem
        if (!empty($this->dados['fotos'])) {
            foreach ($this->dados['fotos'] as $foto) {
                $email->attach(storage_path('app/' . $foto));
            }
        }

        return $email;
    }
}