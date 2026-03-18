import { useForm } from '@inertiajs/react';
import { useCallback, useEffect } from 'react';

import users from '@/routes/users';
import { useUserStore } from '../store';

export const useUserForm = () => {
    const { mode, selected, close } = useUserStore();

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [] as string[],
    });

    useEffect(() => {
        if (mode === 'edit' && selected) {
            setData({
                name: selected.name,
                email: selected.email,
                password: '',
                password_confirmation: '',
                roles: selected.roles,
            });
        } else {
            reset();
        }
    }, [mode, selected]);

    const toggleRole = useCallback(
        (role: string) => {
            setData(
                'roles',
                data.roles.includes(role)
                    ? data.roles.filter((r) => r !== role)
                    : [...data.roles, role],
            );
        },
        [data.roles, setData],
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (mode === 'create') {
                post(users.store().url, { onSuccess: close });
            } else if (mode === 'edit' && selected) {
                put(users.update(selected.id).url, { onSuccess: close });
            }
        },
        [mode, selected, post, put, close],
    );

    return {
        data,
        setData,
        processing,
        errors,
        handleSubmit,
        toggleRole,
    };
};
