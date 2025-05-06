<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * |--------------------------------------------------------------------------
 * | Models
 * |--------------------------------------------------------------------------
 * @see https://laravel.com/docs/12.x/eloquent#generating-model-classes
 */
class Example extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * @see https://laravel.com/docs/12.x/eloquent#mass-assignment
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'age',
        'address',
    ];

    /**
     * Example relationship.
     * One to Many / Has Many
     * @see https://laravel.com/docs/12.x/eloquent-relationships#one-to-many-inverse
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
