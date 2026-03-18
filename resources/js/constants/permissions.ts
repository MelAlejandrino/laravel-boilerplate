export const PERMISSIONS = {
    DASHBOARD_VIEW: 'view dashboard',
    USER_VIEW: 'view users',
    USER_CREATE: 'create users',
    USER_EDIT: 'edit users',
    USER_DELETE: 'delete users',
    ROLE_VIEW: 'view roles',
    ROLE_CREATE: 'create roles',
    ROLE_EDIT: 'edit roles',
    ROLE_DELETE: 'delete roles',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];