import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { DataTable } from '@/components/data-table';
import type { PaginatedData } from '@/components/data-table/data-table-pagination';
import type { SortDirection } from '@/components/data-table/data-table-sort';
import { index } from '@/routes/users';

import { useUserStore } from '../store';
import type { User, UsersFilters } from '../types';
import { usePermission } from '@/hooks/use-permission';
import { userColumns } from '../get-user-columns';

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

    return <DataTable columns={columns} table={table} />;
};
