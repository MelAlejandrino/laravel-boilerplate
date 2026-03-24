import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import type { PaginatedData } from '@/components/data-table/data-table-pagination';
import { DataTablePagination } from '@/components/data-table/data-table-pagination';
import { DataTableSearch } from '@/components/data-table/data-table-search';
import { Button } from '@/components/ui/button';
import { PERMISSIONS } from '@/constants/permissions';
import { RoleDeleteDialog } from '@/features/roles/components/role-delete-dialog';
import { RoleSheet } from '@/features/roles/components/role-sheet';
import { RoleTable } from '@/features/roles/components/role-table';
import { useRoleStore } from '@/features/roles/store';
import type { Role, RolesFilters } from '@/features/roles/types';

import { usePermission } from '@/hooks/use-permission';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/roles';
import type { Flash } from '@/types';
import { CardTitle } from '@/components/ui/card';

interface Props {
    roles: PaginatedData<Role>;
    permissions: string[];
    flash: Flash;
    filters: RolesFilters;
}

export default function RolesIndex({
    roles,
    permissions,
    flash,
    filters,
}: Props) {
    const { open, deleting, closeDelete } = useRoleStore();

    useEffect(() => {
        if (flash?.error) {
            toast.error(flash.error);
        }

        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    const { hasPermission } = usePermission();

    return (
        <AppLayout>
            <Head title="Roles" />
            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-2xl font-semibold">Roles</h1>
                <div className="flex items-center justify-between">
                    <DataTableSearch
                        url={index().url}
                        initialValue={filters.search}
                        placeholder="Search roles..."
                    />
                    {hasPermission(PERMISSIONS.ROLE_CREATE) && (
                        <Button onClick={() => open('create')}>
                            Create Role
                        </Button>
                    )}
                </div>

                <RoleTable filters={filters} roles={roles} />
                <DataTablePagination
                    meta={roles.meta}
                    url={index().url}
                    params={filters}
                />
                <RoleSheet permissions={permissions} />
                <RoleDeleteDialog
                    role={deleting}
                    open={!!deleting}
                    onClose={closeDelete}
                />
            </div>
        </AppLayout>
    );
}
