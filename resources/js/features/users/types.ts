export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    roles: string[];
    permissions: string[];
    created_at: string;
    updated_at: string;
}

export type UserMode = 'create' | 'edit' | '';

export interface UsersFilters {
    search: string;
    per_page: number;
    page: number;
    sort: string;
    direction: 'asc' | 'desc' | null;
    [key: string]: string | number | null;
}
