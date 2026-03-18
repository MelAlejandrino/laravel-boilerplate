import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';

import { useUserStore } from '../store';
import { UserForm } from './user-form';

interface UserSheetProps {
    roles: string[];
}

export const UserSheet = ({ roles }: UserSheetProps) => {
    const { mode, close } = useUserStore();

    return (
        <Sheet open={mode !== ''} onOpenChange={(open) => !open && close()}>
            <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>
                        {mode === 'create' ? 'Create User' : 'Edit User'}
                    </SheetTitle>
                </SheetHeader>
                <div className="p-6">
                    <UserForm roles={roles} />
                </div>
            </SheetContent>
        </Sheet>
    );
};
