import { Head, usePage } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

export default function Dashboard() {
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
    }, []);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Button onClick={handleClick}>test</Button>
            </div>
        </AppLayout>
    );
}
