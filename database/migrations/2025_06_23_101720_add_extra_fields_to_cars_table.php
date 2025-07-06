<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->integer('kilometers')->nullable()->after('price');
            $table->string('fuel')->nullable()->after('kilometers');
            $table->string('transmission')->nullable()->after('fuel');
            $table->integer('power')->nullable()->after('transmission'); // potência em cv
            $table->json('features')->nullable()->after('power'); // lista de características
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->dropColumn(['kilometers', 'fuel', 'transmission', 'power', 'features']);
        });
    }
};