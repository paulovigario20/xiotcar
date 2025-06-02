<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTestemunhosTable extends Migration
{
    public function up()
    {
        Schema::create('testemunhos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->text('mensagem');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('testemunhos');
    }
}