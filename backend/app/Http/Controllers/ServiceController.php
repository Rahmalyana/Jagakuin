<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ServiceController extends Controller
{
    public function index()
    {
        // Mengambil semua data jasa dari database
        $services = Service::all();
        return response()->json($services);
    }

    public function store(Request $request)
    {
        // Fungsi untuk menyimpan data dari form "Tambah" nanti
        $validated = $request->validate([
            'name' => 'required',
            'type' => 'required',
            'category' => 'required',
            'payment' => 'required',
            'duration' => 'required',
            'price' => 'required',
        ]);

        $service = Service::create($validated);
        return response()->json($service, 201);
    }
}