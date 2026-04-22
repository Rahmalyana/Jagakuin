<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Review;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'to_user' => 'required|integer',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable'
        ]);

        $review = Review::create([
            'from_user' => 1,
            'to_user' => $request->to_user,
            'rating' => $request->rating,
            'comment' => $request->comment
        ]);

        return response()->json([
            'message' => 'Review submitted',
            'data' => $review
        ]);
    }

    public function index()
    {
        return response()->json(Review::latest()->get());
    }
}
