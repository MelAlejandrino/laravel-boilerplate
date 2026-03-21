<?php

namespace App\Observers;

use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class RoleObserver
{
    /**
     * Handle the Role "created" event.
     */
    public function created(Role $role): void
    {
        activity()
            ->performedOn($role)
            ->causedBy(Auth::user())
            ->withProperties(['name' => $role->name])
            ->log("Role \"{$role->name}\" created");
    }

    /**
     * Handle the Role "updated" event.
     */
    public function updated(Role $role): void
    {
        activity()
            ->performedOn($role)
            ->causedBy(Auth::user())
            ->withProperties(['name' => $role->name])
            ->log("Role \"{$role->name}\" updated");
    }

    /**
     * Handle the Role "deleted" event.
     */
    public function deleted(Role $role): void
    {
        activity()
            ->performedOn($role)
            ->causedBy(Auth::user())
            ->withProperties(['name' => $role->name])
            ->log("Role \"{$role->name}\" deleted");
    }
}
