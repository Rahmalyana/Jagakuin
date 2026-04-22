<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        return response()->json(
            Post::with('user')->latest()->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|in:offer,request',
            'category' => 'required|in:anak,lansia,properti',
            'description' => 'required',
            'date' => 'required|date',
            'duration' => 'required|integer',
            'compensation' => 'required|in:barter,uang,barang',
        ]);

        $post = Post::create([
            'user_id' => 1, // dummy user
            'type' => $request->type,
            'category' => $request->category,
            'description' => $request->description,
            'date' => $request->date,
            'duration' => $request->duration,
            'compensation' => $request->compensation,
        ]);

        return response()->json([
            'message' => 'Post created',
            'data' => $post
        ]);
    }

    public function show($id)
    {
        $post = Post::with('user')->findOrFail($id);
        return response()->json($post);
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $post->update($request->all());

        return response()->json([
            'message' => 'Post updated',
            'data' => $post
        ]);
    }

    public function destroy($id)
    {
        Post::destroy($id);

        return response()->json([
            'message' => 'Post deleted'
        ]);
    }
}
