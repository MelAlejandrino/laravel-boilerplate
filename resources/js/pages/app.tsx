import { usePage } from '@inertiajs/react';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { home } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: home(),
    },
];

export default function App() {
    const { auth } = usePage().props;

    const handleClick = useCallback(async () => {
        await fetch('/api/test', {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then((r) => r.json())
            .then(console.log);
    }, [auth.token]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Button onClick={handleClick}>test</Button>
            </div>
        </AppLayout>
    );
}
