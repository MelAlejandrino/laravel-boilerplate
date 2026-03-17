export const groupPermissions = (
    permissions: string[],
): Record<string, string[]> => {
    return permissions.reduce(
        (groups, permission) => {
            const [, resource] = permission.split(' ');

            if (!groups[resource]) {
groups[resource] = [];
}

            groups[resource].push(permission);

            return groups;
        },
        {} as Record<string, string[]>,
    );
};
