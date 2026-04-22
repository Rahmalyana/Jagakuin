<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Chat;

class ChatController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|integer',
            'message' => 'required'
        ]);

        $chat = Chat::create([
            'sender_id' => 1,
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
        ]);

        return response()->json([
            'message' => 'Message sent',
            'data' => $chat
        ]);
    }

    public function index()
    {
        return response()->json(Chat::latest()->get());
    }
}
