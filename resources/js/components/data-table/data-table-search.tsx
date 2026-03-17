import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Input } from '@/components/ui/input';

interface DataTableSearchProps {
    url: string;
    initialValue?: string;
    placeholder?: string;
}

export const DataTableSearch = ({
    url,
    initialValue = '',
    placeholder = 'Search...',
}: DataTableSearchProps) => {
    const [search, setSearch] = useState(initialValue);

    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSearch(value);
            router.get(
                url,
                { search: value, page: 1 },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        },
        [url],
    );

    return (
        <div className="relative w-64">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                value={search}
                onChange={handleSearch}
                placeholder={placeholder}
                className="pl-9"
            />
        </div>
    );
};
