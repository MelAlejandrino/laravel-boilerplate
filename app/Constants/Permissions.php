<?php

namespace App\Constants;

class Permissions
{
    const DASHBOARD_VIEW = 'view dashboard';

    const USER_VIEW = 'view users';
    const USER_CREATE = 'create users';
    const USER_EDIT = 'edit users';
    const USER_DELETE = 'delete users';

    const ROLE_VIEW = 'view roles';
    const ROLE_CREATE = 'create roles';
    const ROLE_EDIT = 'edit roles';
    const ROLE_DELETE = 'delete roles';

    const ACTIVITY_LOG_VIEW = 'view activity logs';


    const ALL = [
        self::DASHBOARD_VIEW,
        self::USER_VIEW,
        self::USER_CREATE,
        self::USER_EDIT,
        self::USER_DELETE,
        self::ROLE_VIEW,
        self::ROLE_CREATE,
        self::ROLE_EDIT,
        self::ROLE_DELETE,
        self::ACTIVITY_LOG_VIEW
    ];
}
