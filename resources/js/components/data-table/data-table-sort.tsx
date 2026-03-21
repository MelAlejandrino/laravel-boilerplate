import { router } from '@inertiajs/react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useCallback } from 'react';

export type SortDirection = 'asc' | 'desc' | null;

interface DataTableSortProps {
    label: string;
    column: string;
    url: string;
    params?: Record<string, string | number | null | boolean>;
    currentSort?: string | null;
    currentDirection?: SortDirection;
}

export const DataTableSort = ({
    label,
    column,
    url,
    params,
    currentSort,
    currentDirection,
}: DataTableSortProps) => {
    const isActive = currentSort === column;

    const nextDirection = useCallback((): SortDirection => {
        if (!isActive) {
return 'asc';
}

        if (currentDirection === 'asc') {
return 'desc';
}

        return null;
    }, [isActive, currentDirection]);

    const handleSort = useCallback(() => {
        const direction = nextDirection();

        router.get(
            url,
            {
                ...params,
                sort: direction ? column : null,
                direction: direction,
                page: 1,
            },
            { preserveState: false, preserveScroll: true, replace: true },
        );
    }, [column, url, params, nextDirection]);

    const Icon = isActive
        ? currentDirection === 'asc'
            ? ArrowUp
            : currentDirection === 'desc'
              ? ArrowDown
              : ArrowUpDown
        : ArrowUpDown;

    return (
        <button
            type="button"
            onClick={handleSort}
            className="flex items-center gap-1 transition-colors hover:text-foreground"
        >
            {label}
            <Icon
                className={`h-3 w-3 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}
            />
        </button>
    );
};
