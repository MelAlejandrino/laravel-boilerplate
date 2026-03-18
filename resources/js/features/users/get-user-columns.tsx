import type { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

import type { SortDirection } from '@/components/data-table/data-table-sort';
import { DataTableSort } from '@/components/data-table/data-table-sort';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PERMISSIONS } from '@/constants/permissions';

import type { User, UsersFilters } from './types';

interface UserColumnsProps {
    url: string;
    params?: Record<string, string | number | null>;
    currentSort?: string;
    currentDirection?: SortDirection;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
    hasPermission: (permission: string) => boolean;
}

export const userColumns = ({
    url,
    params,
    currentSort,
    currentDirection,
    onEdit,
    onDelete,
    hasPermission,
}: UserColumnsProps): ColumnDef<User>[] => {
    const canEdit = hasPermission(PERMISSIONS.USER_EDIT);
    const canDelete = hasPermission(PERMISSIONS.USER_DELETE);

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'name',
            header: () => (
                <DataTableSort
                    label="Name"
                    column="name"
                    url={url}
                    params={params}
                    currentSort={currentSort}
                    currentDirection={currentDirection}
                />
            ),
        },
        {
            accessorKey: 'email',
            header: () => (
                <DataTableSort
                    label="Email"
                    column="email"
                    url={url}
                    params={params}
                    currentSort={currentSort}
                    currentDirection={currentDirection}
                />
            ),
        },
        {
            accessorKey: 'roles',
            header: 'Roles',
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-1">
                    {row.original.roles.map((role) => (
                        <Badge
                            key={role}
                            variant="secondary"
                            className="capitalize"
                        >
                            {role}
                        </Badge>
                    ))}
                </div>
            ),
        },
    ];

    if (canEdit || canDelete) {
        columns.push({
            id: 'actions',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    {canEdit && (
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => onEdit(row.original)}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                    )}
                    {canDelete && (
                        <Button
                            size="icon"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => onDelete(row.original)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            ),
            meta: { fitWidth: true },
        });
    }

    return columns;
};
