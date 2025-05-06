<?php

namespace Database\Seeders;

use App\Models\Example;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

/**
 *  |--------------------------------------------------------------------------
 *  | Seeders
 *  |--------------------------------------------------------------------------
 * @see https://laravel.com/docs/12.x/seeding
 */
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        /**
         * Persisting Models
         * @see https://laravel.com/docs/12.x/eloquent-factories#persisting-models
         */
        // \App\Models\User::factory(10)->create();
        User::factory()->create([
            'name' => 'Eko Saputra',
            'email' => 'me@ekovegeance.com',
        ]);

        /**
         * Factory with relationship
         * @see https://laravel.com/docs/12.x/eloquent-factories#factory-relationships
         */
        User::factory(10)
            ->has(Example::factory())
            ->count(10)
            ->create();
    }
}
