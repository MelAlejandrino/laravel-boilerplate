<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $roleId = $this->route('role')?->id;

        return [
            'name' => ['required', 'string', 'max:255', 'unique:roles,name,' . $roleId],
            'permissions' => ['required', 'array', 'min:1'],
            'permissions.*' => ['exists:permissions,name'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $permissions = $this->input('permissions', []);
            $hasView = collect($permissions)->contains(fn($p) => str_starts_with($p, 'view '));

            if (!$hasView) {
                $validator->errors()->add('permissions', 'At least one view permission is required.');
            }
        });
    }

    public function messages(): array
    {
        return [
            'permissions.required' => 'At least one permission is required.',
            'permissions.min' => 'At least one permission is required.',
        ];
    }
}
