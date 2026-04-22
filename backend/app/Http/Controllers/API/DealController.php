<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Deal;

class DealController extends Controller
{
    public function agree(Request $request)
    {
        $request->validate([
            'post_id' => 'required|integer'
        ]);

        $deal = Deal::create([
            'post_id' => $request->post_id,
            'user_id' => 1,
            'status' => 'agreed'
        ]);

        return response()->json([
            'message' => 'Deal agreed',
            'data' => $deal
        ]);
    }

    public function index()
    {
        return response()->json(Deal::latest()->get());
    }
}
