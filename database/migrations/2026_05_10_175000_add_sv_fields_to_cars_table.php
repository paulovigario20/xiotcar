<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->string('color')->nullable()->after('power');
            $table->integer('doors')->nullable()->after('color');
            $table->string('engine_capacity')->nullable()->after('doors');
            $table->string('version')->nullable()->after('model');
            $table->json('extra_photos')->nullable()->after('image');
        });
    }

    public function down(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->dropColumn(['color', 'doors', 'engine_capacity', 'version', 'extra_photos']);
        });
    }
};
