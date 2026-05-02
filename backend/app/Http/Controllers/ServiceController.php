<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::all()->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'type' => $item->type,
                'category' => $item->category,
                'payment' => $item->payment,
                'duration' => $item->duration,
                'rating' => $item->rating,
                'price' => $item->price,

                // mapping ke frontend
                'tasks' => $item->description, 
                // PERBAIKAN: Ambil data asli dari database, jangan di-hardcode null!
                'date' => $item->date,
                'time' => $item->time,
                'child_age' => $item->child_age,
                'elder_age' => $item->elder_age,
                'gender' => $item->gender, // Tambahan untuk gender
            ];
        });

        return response()->json($services);
    }

    public function store(Request $request)
    {
        // PERBAIKAN: Tambahkan field baru di sini agar tidak dibuang oleh Laravel
        $validated = $request->validate([
            'name' => 'required',
            'type' => 'required',
            'category' => 'required',
            'payment' => 'required',
            'duration' => 'required',
            'price' => 'required',
            'description' => 'nullable',
            
            // Tambahkan ini supaya bisa masuk ke database!
            'date' => 'nullable',
            'time' => 'nullable',
            'child_age' => 'nullable',
            'elder_age' => 'nullable',
            'gender' => 'nullable',
        ]);

        $service = Service::create($validated);
        return response()->json($service, 201);
    }
}