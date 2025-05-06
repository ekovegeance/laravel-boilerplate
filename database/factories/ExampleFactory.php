<?php

namespace Database\Factories;

use App\Models\Example;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 *  |--------------------------------------------------------------------------
 *  | Factories
 *  |--------------------------------------------------------------------------
 * @see https://laravel.com/docs/12.x/eloquent-factories
 * @extends Factory<Example>
 */
class ExampleFactory extends Factory
{
    /**
     * Define the model's default state.
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => rand(1, 10),
            'name' => fake()->name(),
            'age' => fake()->numberBetween(1, 100),
            'address' => fake()->address(),
        ];
    }
}
