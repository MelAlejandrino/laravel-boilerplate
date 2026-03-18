import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { DataTablePagination } from '@/components/data-table/data-table-pagination';
import type { PaginatedData } from '@/components/data-table/data-table-pagination';
import { DataTableSearch } from '@/components/data-table/data-table-search';
import { Button } from '@/components/ui/button';
import { PERMISSIONS } from '@/constants/permissions';
import { UserDeleteDialog } from '@/features/users/components/user-delete-dialog';
import { UserSheet } from '@/features/users/components/user-sheet';
import { UserTable } from '@/features/users/components/user-table';
import { useUserStore } from '@/features/users/store';
import type { User, UsersFilters } from '@/features/users/types';
import { usePermission } from '@/hooks/use-permission';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/users';

interface Props {
    users: PaginatedData<User>;
    roles: string[];
    filters: UsersFilters;
    flash: { success: string | null; error: string | null };
}

export default function UsersIndex({ users, roles, filters, flash }: Props) {
    const { open, deleting, closeDelete } = useUserStore();
    const { hasPermission } = usePermission();

    useEffect(() => {
        if (flash?.error) {
            toast.error(flash.error);
        }

        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    return (
        <AppLayout>
            <Head title="Users" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Users</h1>
                    {hasPermission(PERMISSIONS.USER_CREATE) && (
                        <Button onClick={() => open('create')}>
                            Create User
                        </Button>
                    )}
                </div>
                <DataTableSearch
                    url={index().url}
                    initialValue={filters.search}
                    placeholder="Search users..."
                />
                <UserTable users={users} filters={filters} />
                <DataTablePagination
                    meta={users.meta}
                    url={index().url}
                    params={filters}
                />
                <UserSheet roles={roles} />
                <UserDeleteDialog
                    user={deleting}
                    open={!!deleting}
                    onClose={closeDelete}
                />
            </div>
        </AppLayout>
    );
}
