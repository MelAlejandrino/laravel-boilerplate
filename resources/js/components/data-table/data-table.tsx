import type { ColumnDef, Table as TableDef } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { DataTableProgressSpinner } from './data-table-progress-spinner';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData, TValue> {
        fitWidth?: boolean;
    }
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    table: TableDef<TData>;
    isLoading?: boolean;
    customEmptyMessage?: string;
    fixedLayout?: boolean;
    maxHeight?: number;
}

const TANSTACK_DEFAULT_SIZE = 150;

function getColumnStyle(
    size: number | undefined,
    maxSize: number | undefined,
    fitWidth: boolean | undefined,
    defaultColumnSize: number | undefined,
): React.CSSProperties | undefined {
    // fitWidth: shrink to content, never inherits defaultColumn.size.
    if (fitWidth) {
        return {
            width: '1%',
            whiteSpace: 'nowrap',
        };
    }

    const hasExplicitSize =
        size !== undefined && size !== TANSTACK_DEFAULT_SIZE;

    if (hasExplicitSize) {
        // Explicit per-column size: lock it with both width AND minWidth so the
        // browser cannot shrink or grow it regardless of content or table width.
        return {
            width: `${size}px`,
            minWidth: `${size}px`,
            maxWidth: maxSize ? `${maxSize}px` : undefined,
        };
    }

    if (defaultColumnSize !== undefined) {
        // Global default size: same treatment — width + minWidth prevents dancing
        // across pages where content lengths differ.
        return {
            width: `${defaultColumnSize}px`,
            minWidth: `${defaultColumnSize}px`,
            maxWidth: maxSize ? `${maxSize}px` : undefined,
        };
    }

    if (maxSize) {
        return { maxWidth: `${maxSize}px` };
    }

    return undefined;
}

export function DataTable<TData, TValue>({
    columns,
    table,
    isLoading,
    customEmptyMessage = 'No Results.',
    fixedLayout = false,
    maxHeight,
}: DataTableProps<TData, TValue>) {
    const defaultColumnSize = table.options.defaultColumn?.size;

    const hasFitWidthColumn = table
        .getAllColumns()
        .some((col) => col.columnDef.meta?.fitWidth);

    const useTableFixed = fixedLayout && !hasFitWidthColumn;

    return (
        <div
            className={cn('relative w-full overflow-auto rounded-md border')}
            style={{ maxHeight: maxHeight ? `${maxHeight}px` : '600px' }}
        >
            {isLoading && <DataTableProgressSpinner isFetching={isLoading} />}
            <table
                className={cn(
                    'w-full caption-bottom text-sm',
                    useTableFixed && 'table-fixed',
                )}
            >
                <thead className="bg-muted [&_tr]:border-b">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr
                            key={headerGroup.id}
                            className="border-b transition-colors"
                        >
                            {headerGroup.headers.map((header) => {
                                const colDef = header.column.columnDef;

                                return (
                                    <th
                                        key={header.id}
                                        className="sticky top-0 z-20 h-10 bg-muted px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                                        style={getColumnStyle(
                                            colDef.size,
                                            colDef.maxSize,
                                            colDef.meta?.fitWidth,
                                            defaultColumnSize,
                                        )}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                data-state={
                                    row.getIsSelected() ? 'selected' : undefined
                                }
                                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                            >
                                {row.getVisibleCells().map((cell) => {
                                    const colDef = cell.column.columnDef;

                                    return (
                                        <td
                                            key={cell.id}
                                            style={getColumnStyle(
                                                colDef.size,
                                                colDef.maxSize,
                                                colDef.meta?.fitWidth,
                                                defaultColumnSize,
                                            )}
                                            className="border-r border-border p-2 align-middle last:border-r-0 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                                        >
                                            <div className="[&>div]:text-wrap">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="h-24 p-2 text-center align-middle"
                            >
                                {customEmptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
