<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    // ================= GET PROFILE =================
    public function show()
    {
        $user = Auth::user();

        return response()->json([
            'name' => $user->name,
            'email' => $user->email,
            'bio' => $user->bio,
            'tags' => $user->tags,
            'rating' => $user->rating,
            'profile_image_url' => $user->profile_image
                ? asset('storage/' . $user->profile_image)
                : null,
        ]);
    }

    // ================= UPDATE PROFILE =================
    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'tags' => 'nullable|array',
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'Profile berhasil diupdate'
        ]);
    }

    // ================= UPLOAD FOTO =================
    public function uploadPhoto(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'photo' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // hapus foto lama (kalau ada)
        if ($user->profile_image && Storage::disk('public')->exists($user->profile_image)) {
            Storage::disk('public')->delete($user->profile_image);
        }

        // simpan foto baru
        $path = $request->file('photo')->store('profiles', 'public');

        $user->update([
            'profile_image' => $path,
        ]);

        return response()->json([
            'url' => asset('storage/' . $path),
        ]);
    }

    // ================= CHANGE PASSWORD =================
    public function changePassword(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|min:6|confirmed',
        ]);

        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json([
                'message' => 'Password lama salah'
            ], 400);
        }

        // update password
        $user->update([
            'password' => Hash::make($request->new_password),
        ]);

        $user->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Password berhasil diubah'
        ]);
    }
}
