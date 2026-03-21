import { Head } from '@inertiajs/react';
import { DataTablePagination } from '@/components/data-table/data-table-pagination';
import { DataTableSearch } from '@/components/data-table/data-table-search';
import { ActivityLogTable } from '@/features/activity-logs/components/activity-log-table';
import type { ActivityLogFilters } from '@/features/activity-logs/types';
import type { PaginatedData } from '@/components/data-table/data-table-pagination';
import type { ActivityLog } from '@/features/activity-logs/types';
import AppLayout from '@/layouts/app-layout';
import activityLogs from '@/routes/activity-logs';

interface Props {
    logs: PaginatedData<ActivityLog>;
    filters: ActivityLogFilters;
}

export default function ActivityLogsIndex({ logs, filters }: Props) {
    return (
        <AppLayout>
            <Head title="Activity Logs" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Activity Logs</h1>
                </div>
                <DataTableSearch
                    url={activityLogs.index().url}
                    initialValue={filters.search}
                    placeholder="Search logs..."
                />
                <ActivityLogTable logs={logs} filters={filters} />
                <DataTablePagination
                    meta={logs.meta}
                    url={activityLogs.index().url}
                    params={filters}
                />
            </div>
        </AppLayout>
    );
}
