<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActivityLogResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity;

class ActivityLogController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->integer('per_page', 10);
        $search = $request->string('search')->trim()->toString() ?: null;
        $page = $request->integer('page', 1);
        $sort = $request->string('sort')->toString();
        $direction = $request->string('direction', 'desc')->toString();

        return Inertia::render('activity-logs/index', [
            'logs' => ActivityLogResource::collection(
                Activity::with('causer')
                    ->when(
                        $search,
                        fn($q) => $q->where('description', 'like', "%{$search}%")
                            ->orWhereHasMorph('causer', '*', fn($q) => $q->where('name', 'like', "%{$search}%"))
                    )
                    ->when(
                        $sort === 'causer',
                        fn($q) => $q
                            ->leftJoin('users', 'activity_log.causer_id', '=', 'users.id')
                            ->orderBy('users.name', $direction)
                            ->select('activity_log.*')
                    )
                    ->when($sort && $sort !== 'causer', fn($q) => $q->orderBy($sort, $direction))
                    ->when(!$sort, fn($q) => $q->orderBy('created_at', 'desc'))
                    ->paginate($perPage)
                    ->withQueryString()
            ),
            'filters' => [
                'search' => $search,
                'per_page' => $perPage,
                'page' => $page,
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }
}
