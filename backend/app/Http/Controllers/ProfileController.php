<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    // GET PROFILE
    public function show(Request $request)
    {
        return response()->json($request->user());
    }

    // UPDATE PROFILE
    public function update(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'bio' => 'nullable|string',
            'tags' => 'nullable|array',
            'profile_image' => 'nullable|string',
        ]);

        $user->update([
            'bio' => $request->bio,
            'tags' => $request->tags,
            'profile_image' => $request->profile_image,
        ]);

        return response()->json([
            'message' => 'Profile berhasil diupdate',
            'data' => $user
        ]);
    }

    // UPDATE PASSWORD
    public function updatePassword(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|min:6',
        ]);

        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json([
                'message' => 'Password lama salah'
            ], 400);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'message' => 'Password berhasil diubah'
        ]);
    }
}
