import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { DataTable } from '@/components/data-table';
import type { PaginatedData } from '@/components/data-table/data-table-pagination';
import type { SortDirection } from '@/components/data-table/data-table-sort';
import { useLoading } from '@/hooks/use-loading';
import { usePermission } from '@/hooks/use-permission';
import { index } from '@/routes/users';

import { userColumns } from '../get-user-columns';
import { useUserStore } from '../store';
import type { User, UsersFilters } from '../types';

interface UserTableProps {
    users: PaginatedData<User>;
    filters: UsersFilters;
}

export const UserTable = ({ users, filters }: UserTableProps) => {
    const { open, openDelete } = useUserStore();
    const { hasPermission } = usePermission();

    const columns = userColumns({
        url: index().url,
        params: filters,
        currentSort: filters.sort,
        currentDirection: filters.direction as SortDirection,
        onEdit: (user) => open('edit', user),
        onDelete: openDelete,
        hasPermission,
    });

    const table = useReactTable({
        data: users.data,
        columns,
        rowCount: users.meta.total,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
    });

    const { isLoading } = useLoading();

    return <DataTable columns={columns} table={table} isLoading={isLoading} />;
};
