import { LayoutGrid, Grid, User, Activity } from 'lucide-react';
import { PERMISSIONS } from '@/constants/permissions';
import { home } from '@/routes';
import roles from '@/routes/roles';
import users from '@/routes/users';
import type { NavItem } from '@/types';
import { usePermission } from './use-permission';
import activityLogs from '@/routes/activity-logs';

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
        ...(hasPermission(PERMISSIONS.ACTIVITY_LOG_VIEW)
            ? [
                  {
                      title: 'Activity Logs',
                      href: activityLogs.index().url,
                      icon: Activity,
                  },
              ]
            : []),
    ];

    return { mainNavItems };
};
