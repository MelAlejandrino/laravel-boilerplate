import { useForm } from '@inertiajs/react';
import { useCallback } from 'react';

import users from '@/routes/users';
import type { User } from '../types';

export const useUserDelete = () => {
    const { delete: destroy, processing } = useForm();

    const handleDelete = useCallback(
        (user: User, onSuccess: () => void) => {
            destroy(users.destroy(user.id).url, { onSuccess });
        },
        [destroy],
    );

    return { handleDelete, processing };
};
