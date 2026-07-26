<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $tasks = Task::query()
            ->withCount('photos')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(9)
            ->withQueryString();

        return Inertia::render('tasks/index', [
            'tasks' => $tasks,
            'filters' => ['search' => $search],
        ]);
    }

    public function create()
    {
        return Inertia::render('tasks/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:pending,in_progress,completed'],
        ]);

        Task::create($validated);

        return redirect()->route('tasks.index')
            ->with('success', 'Task berhasil dibuat.');
    }

    public function show(Task $task)
    {
        $task->load('photos');

        return Inertia::render('tasks/show', [
            'task' => $task,
        ]);
    }

    public function edit(Task $task)
    {
        $task->load('photos');

        return Inertia::render('tasks/edit', [
            'task' => $task,
        ]);
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:pending,in_progress,completed'],
        ]);

        $task->update($validated);

        return redirect()->route('tasks.edit', $task)
            ->with('success', 'Task berhasil diperbarui.');
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->route('tasks.index')
            ->with('success', 'Task berhasil dihapus.');
    }
}
