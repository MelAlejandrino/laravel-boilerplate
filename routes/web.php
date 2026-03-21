<?php

use App\Constants\Permissions;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/forbidden', 'forbidden')->name('forbidden');

    Route::inertia('/', 'app')->name('home')
        ->middleware('permission:' . Permissions::DASHBOARD_VIEW);

    Route::resource('users', UserController::class)->middleware([
        'index' => 'permission:' . Permissions::USER_VIEW,
        'store' => 'permission:' . Permissions::USER_CREATE,
        'update' => 'permission:' . Permissions::USER_EDIT,
        'destroy' => 'permission:' . Permissions::USER_DELETE,
    ]);

    Route::resource('roles', RoleController::class)->middleware([
        'index' => 'permission:' . Permissions::ROLE_VIEW,
        'store' => 'permission:' . Permissions::ROLE_CREATE,
        'update' => 'permission:' . Permissions::ROLE_EDIT,
        'destroy' => 'permission:' . Permissions::ROLE_DELETE,
    ]);

    Route::get('activity-logs', [ActivityLogController::class, 'index'])
        ->name('activity-logs.index')
        ->middleware('permission:' . Permissions::ACTIVITY_LOG_VIEW);
});

require __DIR__ . '/settings.php';
