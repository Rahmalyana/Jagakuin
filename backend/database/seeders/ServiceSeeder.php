<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        // Tips: Pakai truncate() kalau mau hapus data lama dulu sebelum isi baru
        // Service::truncate(); 

        Service::insert([
            [
                'name' => 'Rizki',
                'type' => 'membutuhkan',
                'category' => 'jaga_anak',
                'payment' => 'Uang',
                'duration' => '2 Jam',
                'rating' => 4,
                'price' => '30.000',
                'description' => 'Beri makan dan tidurkan anak',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Susi',
                'type' => 'menyediakan',
                'category' => 'jaga_anak',
                'payment' => 'Barter',
                'duration' => '3 Jam',
                'rating' => 5,
                'price' => 'Buku Cerita',
                'description' => 'Saya suka mendongeng dan membacakan buku',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Fatin',
                'type' => 'membutuhkan',
                'category' => 'jaga_lansia',
                'payment' => 'Uang',
                'duration' => '5 Jam',
                'rating' => 4,
                'price' => '100.000',
                'description' => 'Temani kakek jalan sore dan minum obat',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Roni',
                'type' => 'menyediakan',
                'category' => 'jaga_lansia',
                'payment' => 'Uang',
                'duration' => '8 Jam',
                'rating' => 5,
                'price' => '150.000',
                'description' => 'Perawat lansia berpengalaman 2 tahun',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Doni',
                'type' => 'membutuhkan',
                'category' => 'jaga_properti',
                'payment' => 'Uang',
                'duration' => '12 Jam',
                'rating' => 4,
                'price' => '120.000',
                'description' => 'Jaga toko kelontong shift malam',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Syarif',
                'type' => 'menyediakan',
                'category' => 'jaga_properti',
                'payment' => 'Barter',
                'duration' => 'flexible',
                'rating' => 5,
                'price' => 'Sembako',
                'description' => 'Siap jaga rumah kosong atau proyek',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}