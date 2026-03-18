import { Head } from '@inertiajs/react';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    status: number;
}

const statusMessages: Record<number, { title: string; description: string }> = {
    404: {
        title: 'Page Not Found',
        description:
            "The page you're looking for doesn't exist or has been moved.",
    },
    500: {
        title: 'Server Error',
        description: 'Something went wrong on our end. Please try again later.',
    },
    503: {
        title: 'Service Unavailable',
        description: 'We are down for maintenance. Please check back soon.',
    },
};

export default function Error({ status }: Props) {
    const { title, description } = statusMessages[status] ?? {
        title: 'Unexpected Error',
        description: 'An unexpected error has occurred.',
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
            <Head title={`${status} ${title}`} />
            <FileQuestion className="h-16 w-16 text-muted-foreground" />
            <p className="text-6xl font-bold text-muted-foreground">{status}</p>
            <h1 className="text-3xl font-semibold">{title}</h1>
            <p className="max-w-md text-muted-foreground">{description}</p>
            <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
            </Button>
        </div>
    );
}
