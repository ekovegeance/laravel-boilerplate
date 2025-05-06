<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExampleRequest;
use App\Models\Example;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * |--------------------------------------------------------------------------
 * | Controllers
 * |--------------------------------------------------------------------------
 * @see https://laravel.com/docs/12.x/controllers
 * CRUD (Create, Read, Update, Delete) operations are typically handled by a controller.
 * @see https://laravel.com/docs/12.x/controllers#resource-controllers
 *
 * With Inertia, you can use any controller method to return a view.
 * @see https://inertiajs.com/pages
 * @see https://inertiajs.com/responses
 */
class ExampleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Fetch all examples
        $examples = Example::with('user')
            ->latest()
            ->get();

        return Inertia::render('example/index', [
            'examples' => $examples,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()

    {
        return Inertia::render('example/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ExampleRequest $request): RedirectResponse
    {
        $request->user()
            ->examples()
            ->create($request->validated());

        return redirect()->route('examples.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Example $example): Response
    {
        return Inertia::render('example/show', [
            'example' => $example->load('user'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Example $example): Response
    {
        return Inertia::render('example/edit', [
            'example' => $example->load('user'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ExampleRequest $request, Example $example): RedirectResponse
    {
        $example->update($request->validated());

        return redirect()->route('examples.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Example $example): RedirectResponse
    {
        $example->delete();

        return redirect()->route('examples.index');
    }
}
