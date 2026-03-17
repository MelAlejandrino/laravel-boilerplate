import { usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import users from '@/routes/users';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: users.index(),
    },
];

export default function Users() {
    const { props } = usePage();

    console.log('props', props);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                test
            </div>
        </AppLayout>
    );
}
