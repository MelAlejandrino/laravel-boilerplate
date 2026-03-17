import { Grid, LayoutGrid, User } from 'lucide-react';
import { home } from '@/routes';
import roles from '@/routes/roles';
import users from '@/routes/users';
import type { NavItem } from '@/types';

export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: home(),
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        href: users.index(),
        icon: User,
    },
    {
        title: 'Roles',
        href: roles.index(),
        icon: Grid,
    },
];
