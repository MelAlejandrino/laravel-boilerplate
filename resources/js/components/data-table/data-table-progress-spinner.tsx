import { Spinner } from '@/components/ui/spinner';

type Props = {
    isFetching: boolean;
};

export function DataTableProgressSpinner({ isFetching }: Readonly<Props>) {
    if (isFetching) {
        return (
            <div
                className="absolute inset-0 z-20 flex items-center justify-center bg-gray-100/50"
                style={{ top: '40px' }}
            >
                <Spinner className="size-6" />
            </div>
        );
    }

    return null;
}
