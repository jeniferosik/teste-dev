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
        Schema::create('characters', function (Blueprint $table) {
            $table->id();
            $table->unsignedSmallInteger('api_id')->unique();
            $table->string('name', length: 60);
            $table->enum('status', ['Alive', 'Dead', 'unknown']);
            $table->string('type', length: 50);
            $table->string('species', length: 50);
            $table->enum('gender', ['Female', 'Male', 'Genderless', 'unknown']);            
            $table->foreignId('origin_location_id')->constrained('locations');
            $table->foreignId('current_location_id')->constrained('locations');
            $table->string('image', length: 60);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('characters');
    }
};
