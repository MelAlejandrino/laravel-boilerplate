export interface ActivityLog {
    id: number;
    description: string;
    causer: string;
    subject_type: string | null;
    subject_id: number | null;
    properties: Record<string, any>;
    created_at: string;
}

export interface ActivityLogFilters {
    search: string;
    per_page: number;
    page: number;
    sort: string;
    direction: 'asc' | 'desc' | null;
    [key: string]: string | number | null;
}
