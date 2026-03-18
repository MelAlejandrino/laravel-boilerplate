<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->integer('per_page', 10);
        $search = $request->string('search')->trim();
        $page = $request->integer('page', 1);
        $sort = $request->string('sort', 'name')->toString();
        $direction = $request->string('direction', 'asc')->toString();

        return Inertia::render('users/index', [
            'users' => UserResource::collection(
                User::with('roles')
                    ->where('id', '!=', Auth::id())
                    ->where('is_system', false)
                    ->when($search, fn($q) => $q->where(function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    }))
                    ->when($sort, fn($q) => $q->orderBy($sort, $direction))
                    ->paginate($perPage)
                    ->withQueryString()
            ),
            'roles' => Role::all()->pluck('name'),
            'filters' => [
                'search' => $search,
                'per_page' => $perPage,
                'page' => $page,
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    public function store(UserRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        if ($request->roles) {
            $user->syncRoles($request->roles);
        }

        return back()->with('success', 'User successfully created.');
    }

    public function update(UserRequest $request, User $user)
    {
        if ($user->is_system) {
            return back()->with('error', 'Super admin user cannot be modified.');
        }

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            ...($request->password ? ['password' => bcrypt($request->password)] : []),
        ]);

        if ($request->roles) {
            $user->syncRoles($request->roles);
        }

        return back()->with('success', 'User successfully updated.');
    }

    public function destroy(User $user)
    {
        if ($user->id === Auth::id()) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        if ($user->is_system) {
            return back()->with('error', 'Super admin user cannot be deleted.');
        }

        $user->delete();

        $referer = request()->headers->get('referer');
        $parsedUrl = parse_url($referer);
        parse_str($parsedUrl['query'] ?? '', $params);

        $currentPage = (int) ($params['page'] ?? 1);
        $perPage = (int) ($params['per_page'] ?? 10);
        $pageHasItems = User::where('id', '!=', Auth::id())
            ->where('is_system', false)
            ->when($params['search'] ?? null, fn($q) => $q->where(function ($q) use ($params) {
                $q->where('name', 'like', "%{$params['search']}%")
                    ->orWhere('email', 'like', "%{$params['search']}%");
            }))
            ->forPage($currentPage, $perPage)
            ->count();

        if ($pageHasItems === 0 && $currentPage > 1) {
            $params['page'] = $currentPage - 1;
            return redirect()->route('users.index', $params)
                ->with('success', 'User deleted successfully.');
        }

        return back()->with('success', 'User deleted successfully.');
    }
}
