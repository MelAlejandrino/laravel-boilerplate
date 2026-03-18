import { LayoutGrid, Grid, User } from 'lucide-react';
import { PERMISSIONS } from '@/constants/permissions';
import { home } from '@/routes';
import roles from '@/routes/roles';
import users from '@/routes/users';
import type { NavItem } from '@/types';
import { usePermission } from './use-permission';

export const useNavItems = () => {
    const { hasPermission } = usePermission();

    const mainNavItems: NavItem[] = [
        ...(hasPermission(PERMISSIONS.DASHBOARD_VIEW)
            ? [
                  {
                      title: 'Dashboard',
                      href: home(),
                      icon: LayoutGrid,
                  },
              ]
            : []),
        ...(hasPermission(PERMISSIONS.USER_VIEW)
            ? [
                  {
                      title: 'Users',
                      href: users.index(),
                      icon: User,
                  },
              ]
            : []),
        ...(hasPermission(PERMISSIONS.ROLE_VIEW)
            ? [
                  {
                      title: 'Roles',
                      href: roles.index(),
                      icon: Grid,
                  },
              ]
            : []),
    ];

    return { mainNavItems };
};
