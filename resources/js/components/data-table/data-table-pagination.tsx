import { router } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

export interface PaginatedData<T> {
    data: T[];
    meta: PaginationMeta;
}

interface DataTablePaginationProps {
    meta: PaginationMeta;
    url: string;
    params?: Record<string, string | number | null | boolean>;
}

export const DataTablePagination = ({
    meta,
    url,
    params = {},
}: DataTablePaginationProps) => {
    const { current_page, last_page, total, from, to } = meta;

    const goToPage = (page: number) => {
        router.get(
            url,
            { ...params, page },
            { preserveScroll: true, preserveState: true },
        );
    };

    const changePerPage = (value: string) => {
        router.get(
            url,
            { ...params, per_page: value, page: 1 },
            { preserveScroll: true, preserveState: true },
        );
    };

    return (
        <div className="flex items-center justify-between px-2 py-4">
            <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{from}</span> to{' '}
                <span className="font-medium">{to}</span> of{' '}
                <span className="font-medium">{total}</span> results
            </p>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                        Rows per page
                    </p>
                    <Select
                        value={String(meta.per_page)}
                        onValueChange={changePerPage}
                    >
                        <SelectTrigger className="w-20">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 25, 50, 100].map((size) => (
                                <SelectItem key={size} value={String(size)}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => goToPage(1)}
                        disabled={current_page === 1}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => goToPage(current_page - 1)}
                        disabled={current_page === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="px-2 text-sm">
                        Page {current_page} of {last_page}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => goToPage(current_page + 1)}
                        disabled={current_page === last_page}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => goToPage(last_page)}
                        disabled={current_page === last_page}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
