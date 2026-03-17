<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Http\Resources\RoleResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->integer('per_page', 10);
        $search = $request->string('search')->trim();
        $page = $request->integer('page', 1);
        $sort = $request->string('sort', 'name')->toString();
        $direction = $request->string('direction', 'asc')->toString();

        return Inertia::render('roles/index', [
            'roles' => RoleResource::collection(
                Role::with('permissions')
                    ->when($search, fn($q) => $q->where('name', 'like', "%{$search}%"))
                    ->when($sort, fn($q) => $q->orderBy($sort, $direction))
                    ->paginate($perPage)
                    ->withQueryString()
            ),
            'permissions' => Permission::all()->pluck('name'),
            'filters' => [
                'search' => $search,
                'per_page' => $perPage,
                'page' => $page,
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    public function store(RoleRequest $request)
    {
        $role = Role::create(['name' => $request->name]);

        if ($request->permissions) {
            $role->syncPermissions($request->permissions);
        }

        return back()->with('success', 'Role successfully created.');
    }

    public function update(RoleRequest $request, Role $role)
    {
        $role->update(['name' => $request->name]);

        if ($request->permissions) {
            $role->syncPermissions($request->permissions);
        }

        return back()->with('success', 'Role successfully updated');
    }

    public function destroy(Role $role)
    {
        if ($role->users()->count() > 0) {
            return back()->with('error', 'Role is still assigned to users and cannot be deleted.');
        }

        $role->delete();

        $referer = request()->headers->get('referer');
        $parsedUrl = parse_url($referer);
        parse_str($parsedUrl['query'] ?? '', $params);

        $currentPage = (int) ($params['page'] ?? 1);
        $perPage = (int) ($params['per_page'] ?? 10);
        $pageHasItems = Role::when($params['search'] ?? null, fn($q) => $q->where('name', 'like', "%{$params['search']}%"))
            ->forPage($currentPage, $perPage)
            ->count();

        if ($pageHasItems === 0 && $currentPage > 1) {
            $params['page'] = $currentPage - 1;
            return redirect()->route('roles.index', $params)
                ->with('success', 'Role deleted successfully.');
        }

        return back()->with('success', 'Role deleted successfully.');
    }
}
