import { useForm } from '@inertiajs/react';
import { FormEvent, useCallback, useEffect } from 'react';

import roles from '@/routes/roles';
import { useRoleStore } from '../store';

export const useRoleForm = () => {
    const { mode, selected, close } = useRoleStore();

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        permissions: [] as string[],
    });

    useEffect(() => {
        if (mode === 'edit' && selected) {
            setData({
                name: selected.name,
                permissions: selected.permissions,
            });
        } else {
            reset();
        }
    }, [mode, selected]);

    const togglePermission = useCallback(
        (permission: string) => {
            setData(
                'permissions',
                data.permissions.includes(permission)
                    ? data.permissions.filter((p) => p !== permission)
                    : [...data.permissions, permission],
            );
        },
        [data.permissions, setData],
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLElement>) => {
            e.preventDefault();

            if (mode === 'create') {
                post(roles.store().url, { onSuccess: close });
            } else if (mode === 'edit' && selected) {
                put(roles.update(selected.id).url, { onSuccess: close });
            }
        },
        [mode, selected, post, put, close],
    );

    const toggleAll = useCallback(
        (perms: string[], allChecked: boolean) => {
            setData(
                'permissions',
                allChecked
                    ? data.permissions.filter((p) => !perms.includes(p))
                    : [...new Set([...data.permissions, ...perms])],
            );
        },
        [data.permissions, setData],
    );

    return {
        data,
        setData,
        processing,
        errors,
        handleSubmit,
        togglePermission,
        toggleAll,
    };
};
