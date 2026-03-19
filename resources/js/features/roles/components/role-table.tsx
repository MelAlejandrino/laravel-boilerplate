import type { SortDirection } from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { DataTable } from '@/components/data-table';
import type { PaginatedData } from '@/components/data-table/data-table-pagination';
import { useLoading } from '@/hooks/use-loading';
import { usePermission } from '@/hooks/use-permission';
import { index } from '@/routes/roles';
import { roleColumns } from '../get-roles-columns';
import { useRoleStore } from '../store';
import type { Role, RolesFilters } from '../types';

interface RoleTableProps {
    roles: PaginatedData<Role>;
    filters: RolesFilters;
}

export const RoleTable = ({ roles, filters }: RoleTableProps) => {
    const { open, openDelete } = useRoleStore();
    const { hasPermission } = usePermission();

    const columns = roleColumns({
        url: index().url,
        params: filters,
        currentSort: filters.sort,
        currentDirection: filters.direction as SortDirection,
        onEdit: (role) => open('edit', role),
        onDelete: openDelete,
        hasPermission,
    });

    const table = useReactTable({
        data: roles.data,
        columns,
        rowCount: roles.meta.total,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        defaultColumn: {
            size: 200,
        },
    });

    const { isLoading } = useLoading();

    return (
        <DataTable
            maxHeight={500}
            columns={columns}
            table={table}
            isLoading={isLoading}
        />
    );
};
