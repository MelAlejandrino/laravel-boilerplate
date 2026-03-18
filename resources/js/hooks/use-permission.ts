import { usePage } from '@inertiajs/react';
import { useCallback } from 'react';

export const usePermission = () => {
    const { auth } = usePage().props;
    console.log('auth', auth);

    const hasPermission = useCallback(
        (permission: string) => {
            if (auth.roles.includes('super-admin')) return true;
            return auth.permissions.includes(permission);
        },
        [auth.permissions, auth.roles],
    );

    const hasRole = useCallback(
        (role: string) => auth.roles.includes(role),
        [auth.roles],
    );

    return { hasPermission, hasRole };
};
