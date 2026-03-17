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

import { useRoleDelete } from '../hooks/use-role-delete';
import type { Role } from '../types';

interface RoleDeleteDialogProps {
    role: Role | null;
    open: boolean;
    onClose: () => void;
}

export const RoleDeleteDialog = ({
    role,
    open,
    onClose,
}: RoleDeleteDialogProps) => {
    const { handleDelete, processing } = useRoleDelete();

    return (
        <AlertDialog open={open} onOpenChange={(o) => !o && onClose()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Role</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete{' '}
                        <span className="font-semibold text-foreground">
                            {role?.name}
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
                        onClick={() => role && handleDelete(role, onClose)}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
