import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import { useRoleForm } from '../hooks/use-role-form';
import { useRoleStore } from '../store';
import { groupPermissions } from '../utils';

interface RoleFormProps {
    permissions: string[];
}

const ACTIONS = ['view', 'create', 'edit', 'delete'];

export const RoleForm = ({ permissions }: RoleFormProps) => {
    const { mode, close } = useRoleStore();
    const {
        data,
        setData,
        processing,
        errors,
        handleSubmit,
        togglePermission,
        toggleAll,
    } = useRoleForm();

    const grouped = groupPermissions(permissions);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">Role Name</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="e.g. editor, moderator"
                />
                {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                )}
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
                <Label>Permissions</Label>
                <div className="overflow-hidden rounded-md border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="w-1/3 px-4 py-2 text-left font-medium">
                                    Module
                                </th>
                                <th className="px-4 py-2 text-center font-medium">
                                    All
                                </th>
                                {ACTIONS.map((action) => (
                                    <th
                                        key={action}
                                        className="px-4 py-2 text-center font-medium capitalize"
                                    >
                                        {action}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(grouped).map(
                                ([resource, perms]) => {
                                    const allChecked = perms.every((p) =>
                                        data.permissions.includes(p),
                                    );

                                    return (
                                        <tr key={resource} className="border-t">
                                            <td className="px-4 py-3 font-medium capitalize">
                                                {resource}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <Checkbox
                                                    checked={allChecked}
                                                    onCheckedChange={() =>
                                                        toggleAll(
                                                            perms,
                                                            allChecked,
                                                        )
                                                    }
                                                />
                                            </td>
                                            {ACTIONS.map((action) => {
                                                const permission = `${action} ${resource}`;
                                                const exists =
                                                    perms.includes(permission);

                                                return (
                                                    <td
                                                        key={action}
                                                        className="px-4 py-3 text-center"
                                                    >
                                                        {exists ? (
                                                            <Checkbox
                                                                checked={data.permissions.includes(
                                                                    permission,
                                                                )}
                                                                onCheckedChange={() =>
                                                                    togglePermission(
                                                                        permission,
                                                                    )
                                                                }
                                                            />
                                                        ) : (
                                                            <span className="text-muted-foreground">
                                                                —
                                                            </span>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </div>
                {errors.permissions && (
                    <p className="text-sm text-destructive">
                        {errors.permissions}
                    </p>
                )}
            </div>

            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={close}>
                    Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                    {mode === 'create' ? 'Create Role' : 'Save Changes'}
                </Button>
            </div>
        </form>
    );
};
