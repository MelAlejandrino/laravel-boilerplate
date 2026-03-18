import type { SortDirection } from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { DataTable } from '@/components/data-table';
import type { PaginatedData } from '@/components/data-table/data-table-pagination';
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

    const columns = roleColumns({
        url: index().url,
        params: filters,
        currentSort: filters.sort,
        currentDirection: filters.direction as SortDirection,
        onEdit: (role) => open('edit', role),
        onDelete: openDelete,
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

    return <DataTable maxHeight={500} columns={columns} table={table} />;
};
