import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { useUserDelete } from '../hooks/use-user-delete';
import type { User } from '../types';

interface UserDeleteDialogProps {
    user: User | null;
    open: boolean;
    onClose: () => void;
}

export const UserDeleteDialog = ({
    user,
    open,
    onClose,
}: UserDeleteDialogProps) => {
    const { handleDelete, processing } = useUserDelete();

    return (
        <AlertDialog open={open} onOpenChange={(o) => !o && onClose()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete User</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete{' '}
                        <span className="font-semibold text-foreground">
                            {user?.name}
                        </span>
                        ? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={processing}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={() => user && handleDelete(user, onClose)}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
