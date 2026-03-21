<?php

namespace App\Constants;

class HomeRoutes
{
    const PRIORITY = [
        Permissions::DASHBOARD_VIEW => 'home',
        Permissions::USER_VIEW => 'users.index',
        Permissions::ROLE_VIEW => 'roles.index',
        Permissions::ACTIVITY_LOG_VIEW => 'activity-logs.index',
    ];
}
