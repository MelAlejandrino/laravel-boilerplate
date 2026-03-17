import { useForm } from '@inertiajs/react';
import { useCallback } from 'react';

import roles from '@/routes/roles';

import type { Role } from '../types';

export const useRoleDelete = () => {
    const { delete: destroy, processing } = useForm();

    const handleDelete = useCallback(
        (role: Role, onSuccess: () => void) => {
            destroy(roles.destroy(role.id).url, {
                onSuccess,
            });
        },
        [destroy],
    );

    return { handleDelete, processing };
};
