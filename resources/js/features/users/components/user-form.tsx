import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import { useUserForm } from '../hooks/use-user-form';
import { useUserStore } from '../store';
import VirtualizedDropdown from '@/components/virtualized-dropdown';

interface UserFormProps {
    roles: string[];
}

export const UserForm = ({ roles }: UserFormProps) => {
    const { mode, close } = useUserStore();
    const { data, setData, processing, errors, handleSubmit } = useUserForm();

    const roleOptions = roles.map((role) => ({ id: role, name: role }));
    const selectedRoles = roleOptions.filter((r) => data.roles.includes(r.id));

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Full name"
                />
                {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="email@example.com"
                />
                {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="password">
                    Password{' '}
                    {mode === 'edit' && (
                        <span className="text-xs text-muted-foreground">
                            (leave blank to keep current)
                        </span>
                    )}
                </Label>
                <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder={mode === 'edit' ? '••••••••' : 'Password'}
                />
                {errors.password && (
                    <p className="text-sm text-destructive">
                        {errors.password}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <Input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData('password_confirmation', e.target.value)
                    }
                    placeholder="Confirm password"
                />
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
                <Label>Roles</Label>
                <VirtualizedDropdown
                    data={roleOptions}
                    label="Select roles..."
                    value={selectedRoles}
                    keepOpenOnSelect
                    onChange={(val) => {
                        const selected = val as typeof roleOptions;
                        setData(
                            'roles',
                            selected ? selected.map((r) => r.id) : [],
                        );
                    }}
                />
                {errors.roles && (
                    <p className="text-sm text-destructive">{errors.roles}</p>
                )}
            </div>

            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={close}>
                    Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                    {mode === 'create' ? 'Create User' : 'Save Changes'}
                </Button>
            </div>
        </form>
    );
};
