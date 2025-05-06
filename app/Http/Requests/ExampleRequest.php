<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

/**
 * |--------------------------------------------------------------------------
 * | Form Requests
 * |--------------------------------------------------------------------------
 * @see https://laravel.com/docs/12.x/validation#form-request-validation
 */
class ExampleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * @see https://laravel.com/docs/12.x/validation#authorizing-form-requests
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'age' => ['required', 'integer', 'min:0'],
            'address' => ['required', 'string', 'max:255'],
        ];
    }
}
