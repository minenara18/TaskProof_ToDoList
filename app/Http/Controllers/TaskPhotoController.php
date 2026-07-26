<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TaskPhotoController extends Controller
{
    public function store(Request $request, Task $task)
    {
        $request->validate([
            'photos' => ['required', 'array'],
            'photos.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'caption' => ['nullable', 'string', 'max:255'],
        ]);

        foreach ($request->file('photos', []) as $photo) {
            $path = $photo->store('task-photos', 'public');

            $task->photos()->create([
                'photo_path' => $path,
                'caption' => $request->input('caption'),
            ]);
        }

        return back()->with('success', 'Foto berhasil diupload.');
    }

    public function destroy(Task $task, TaskPhoto $photo)
    {
        if (Storage::disk('public')->exists($photo->photo_path)) {
            Storage::disk('public')->delete($photo->photo_path);
        }

        $photo->delete();

        return back()->with('success', 'Foto berhasil dihapus.');
    }
}
