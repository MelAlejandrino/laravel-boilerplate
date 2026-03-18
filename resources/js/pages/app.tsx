import { usePage } from '@inertiajs/react';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { home } from '@/routes';
import type { BreadcrumbItem, Flash } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: home(),
    },
];

interface Props {
    flash: Flash;
}

export default function App({ flash }: Props) {
    const { auth } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

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
