import { Head, Link } from '@inertiajs/react';
import { ShieldX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';

export default function Forbidden() {
    return (
        <AppLayout>
            <Head title="403 Forbidden" />
            <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                <ShieldX className="h-16 w-16 text-destructive" />
                <h1 className="text-3xl font-semibold">Access Denied</h1>
                <p className="max-w-md text-muted-foreground">
                    You don't have permission to access this page. Contact your
                    administrator if you think this is a mistake.
                </p>
                <Button asChild variant="outline">
                    <Link href="/logout" method="post" as="button">
                        Logout
                    </Link>
                </Button>
            </div>
        </AppLayout>
    );
}
