import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { DataTable } from '@/components/data-table';
import type { PaginatedData } from '@/components/data-table/data-table-pagination';
import type { SortDirection } from '@/components/data-table/data-table-sort';
import activityLogs from '@/routes/activity-logs';
import { activityLogColumns } from '../get-activity-log-columns';
import type { ActivityLog, ActivityLogFilters } from '../types';
import { useLoading } from '@/hooks/use-loading';

interface ActivityLogTableProps {
    logs: PaginatedData<ActivityLog>;
    filters: ActivityLogFilters;
}

export const ActivityLogTable = ({ logs, filters }: ActivityLogTableProps) => {
    const columns = activityLogColumns({
        url: activityLogs.index().url,
        params: filters,
        currentSort: filters.sort,
        currentDirection: filters.direction as SortDirection,
    });

    const table = useReactTable({
        data: logs.data,
        columns,
        rowCount: logs.meta.total,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
    });

    const { isLoading } = useLoading();

    return <DataTable columns={columns} table={table} isLoading={isLoading} />;
};
