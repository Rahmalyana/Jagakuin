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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama posting (misal: Rizki)
            $table->enum('type', ['membutuhkan', 'menyediakan']);
            $table->enum('category', ['jaga_anak', 'jaga_lansia', 'jaga_properti']);
            $table->string('payment'); // Uang / Barter
            $table->string('duration'); // 2 Jam / 5 Jam
            $table->integer('rating')->default(5);
            $table->text('description')->nullable(); // Rincian tugas
            $table->string('price'); // Nominal Rp / Barang
            
            // 👇 INI TAMBAHANNYA 👇
            $table->string('date')->nullable();
            $table->string('time')->nullable();
            $table->string('child_age')->nullable();
            $table->string('elder_age')->nullable();
            $table->string('gender')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};