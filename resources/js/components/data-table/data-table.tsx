import type { ColumnDef, Table as TableDef } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { DataTableProgressSpinner } from './data-table-progress-spinner';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    table: TableDef<TData>;
    isLoading?: boolean;
    customEmptyMessage?: string;
    fixedLayout?: boolean;
    maxHeight?: number;
}

const TANSTACK_DEFAULT_SIZE = 150;

export function DataTable<TData, TValue>({
    columns,
    table,
    isLoading,
    customEmptyMessage = 'No Results.',
    fixedLayout = false,
    maxHeight,
}: DataTableProps<TData, TValue>) {
    return (
        <div
            className={cn('relative w-full overflow-auto rounded-md border')}
            style={{ maxHeight: maxHeight ? `${maxHeight}px` : '600px' }}
        >
            {isLoading && <DataTableProgressSpinner isFetching={isLoading} />}
            <Table className={`w-full ${fixedLayout ? 'table-fixed' : ''}`}>
                <TableHeader className="bg-muted">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const isActions = header.id === 'actions';
                                const colDef = header.column.columnDef;
                                const hasExplicitSize =
                                    !isActions &&
                                    colDef.size !== undefined &&
                                    colDef.size !== TANSTACK_DEFAULT_SIZE;
                                const maxSize = !isActions
                                    ? colDef.maxSize
                                    : undefined;

                                return (
                                    <TableHead
                                        key={header.id}
                                        className="sticky top-0 z-20 bg-muted"
                                        style={
                                            isActions
                                                ? {
                                                      width: '1px',
                                                      whiteSpace: 'nowrap',
                                                  }
                                                : hasExplicitSize
                                                  ? {
                                                        width: `${header.getSize()}px`,
                                                        maxWidth: maxSize
                                                            ? `${maxSize}px`
                                                            : undefined,
                                                    }
                                                  : maxSize
                                                    ? {
                                                          maxWidth: `${maxSize}px`,
                                                      }
                                                    : undefined
                                        }
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    const isActions =
                                        cell.column.id === 'actions';
                                    const colDef = cell.column.columnDef;
                                    const hasExplicitSize =
                                        !isActions &&
                                        colDef.size !== undefined &&
                                        colDef.size !== TANSTACK_DEFAULT_SIZE;
                                    const maxSize = !isActions
                                        ? colDef.maxSize
                                        : undefined;

                                    return (
                                        <TableCell
                                            key={cell.id}
                                            style={
                                                isActions
                                                    ? {
                                                          width: '1px',
                                                          whiteSpace: 'nowrap',
                                                      }
                                                    : hasExplicitSize
                                                      ? {
                                                            width: `${cell.column.getSize()}px`,
                                                            maxWidth: maxSize
                                                                ? `${maxSize}px`
                                                                : undefined,
                                                        }
                                                      : maxSize
                                                        ? {
                                                              maxWidth: `${maxSize}px`,
                                                          }
                                                        : undefined
                                            }
                                            className="border-r border-border last:border-r-0"
                                        >
                                            <div className="[&>div]:text-wrap">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </div>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                {customEmptyMessage}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
