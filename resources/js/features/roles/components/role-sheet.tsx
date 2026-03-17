import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';

import { useRoleStore } from '../store';
import { RoleForm } from './role-form';

interface RoleSheetProps {
    permissions: string[];
}

export const RoleSheet = ({ permissions }: RoleSheetProps) => {
    const { mode, close } = useRoleStore();

    return (
        <Sheet open={mode !== ''} onOpenChange={(open) => !open && close()}>
            <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>
                        {mode === 'create' ? 'Create Role' : 'Edit Role'}
                    </SheetTitle>
                </SheetHeader>
                <div className="p-6">
                    <RoleForm permissions={permissions} />
                </div>
            </SheetContent>
        </Sheet>
    );
};
