export interface Role {
    id: number;
    name: string;
    permissions: string[];
    created_at: string;
    updated_at: string;
}
export interface RolesFilters {
    search: string;
    per_page: number;
    page: number;
    sort: string;
    direction: 'asc' | 'desc' | null;
    [key: string]: string | number | null;
}

export type RoleMode = 'create' | 'edit' | '';
