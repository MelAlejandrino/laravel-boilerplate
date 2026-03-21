import type { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import type { SortDirection } from '@/components/data-table/data-table-sort';
import { DataTableSort } from '@/components/data-table/data-table-sort';
import type { ActivityLog } from './types';

interface ActivityLogColumnsProps {
    url: string;
    params?: Record<string, string | number | null>;
    currentSort?: string;
    currentDirection?: SortDirection;
}

const descriptionVariant = (
    description: string,
): 'default' | 'secondary' | 'destructive' | 'outline' => {
    if (description.includes('deleted') || description.includes('Logged out'))
        return 'destructive';
    if (description.includes('created') || description.includes('Logged in'))
        return 'default';
    if (description.includes('updated') || description.includes('assigned'))
        return 'secondary';
    return 'outline';
};

export const activityLogColumns = ({
    url,
    params,
    currentSort,
    currentDirection,
}: ActivityLogColumnsProps): ColumnDef<ActivityLog>[] => {
    return [
        {
            accessorKey: 'causer',
            header: () => (
                <DataTableSort
                    label="User"
                    column="causer"
                    url={url}
                    params={params}
                    currentSort={currentSort}
                    currentDirection={currentDirection}
                />
            ),
        },
        {
            accessorKey: 'description',
            header: 'Action',
            cell: ({ row }) => (
                <Badge
                    variant={descriptionVariant(row.original.description)}
                    className="whitespace-normal"
                >
                    {row.original.description}
                </Badge>
            ),
            size: 280,
        },
        {
            accessorKey: 'subject_type',
            header: 'Module',
            cell: ({ row }) => (
                <span className="text-muted-foreground capitalize">
                    {row.original.subject_type ?? '—'}
                </span>
            ),
        },
        {
            accessorKey: 'subject_id',
            header: 'Record ID',
            cell: ({ row }) => (
                <span className="text-muted-foreground">
                    {row.original.subject_id ?? '—'}
                </span>
            ),
        },
        {
            accessorKey: 'created_at',
            header: () => (
                <DataTableSort
                    label="When"
                    column="created_at"
                    url={url}
                    params={params}
                    currentSort={currentSort}
                    currentDirection={currentDirection}
                />
            ),
        },
    ];
};
