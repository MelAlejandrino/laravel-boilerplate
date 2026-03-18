import type { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

import type { SortDirection } from '@/components/data-table/data-table-sort';
import { DataTableSort } from '@/components/data-table/data-table-sort';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { PERMISSIONS } from '@/constants/permissions';
import type { Role } from './types';

interface RoleColumnsProps {
    url: string;
    params?: Record<string, string | number | null>;
    currentSort?: string;
    currentDirection?: SortDirection;
    onEdit: (role: Role) => void;
    onDelete: (role: Role) => void;
    hasPermission: (permission: string) => boolean;
}

export const roleColumns = ({
    url,
    params,
    currentSort,
    currentDirection,
    onEdit,
    onDelete,
    hasPermission,
}: RoleColumnsProps): ColumnDef<Role>[] => {
    const canEdit = hasPermission(PERMISSIONS.ROLE_EDIT);
    const canDelete = hasPermission(PERMISSIONS.ROLE_DELETE);

    const columns: ColumnDef<Role>[] = [
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
            accessorKey: 'permissions',
            header: 'Permissions',
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-1">
                    {row.original.permissions.map((permission) => (
                        <Badge key={permission} variant="secondary">
                            {permission}
                        </Badge>
                    ))}
                </div>
            ),
        },
    ];

    if (canEdit || canDelete) {
        columns.push({
            id: 'actions',
            meta: { fitWidth: true },
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
        });
    }

    return columns;
};
