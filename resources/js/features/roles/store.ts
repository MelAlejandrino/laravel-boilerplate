import { create } from 'zustand';
import type { Role, RoleMode } from './types';

interface RoleStore {
    mode: RoleMode;
    selected: Role | null;
    deleting: Role | null;
    setMode: (mode: RoleMode) => void;
    setSelected: (role: Role | null) => void;
    open: (mode: RoleMode, role?: Role) => void;
    close: () => void;
    openDelete: (role: Role) => void;
    closeDelete: () => void;
}

export const useRoleStore = create<RoleStore>((set) => ({
    mode: '',
    selected: null,
    deleting: null,
    setMode: (mode) => set({ mode }),
    setSelected: (role) => set({ selected: role }),
    open: (mode, role = undefined) => set({ mode, selected: role }),
    close: () => set({ mode: '', selected: null }),
    openDelete: (role) => set({ deleting: role }),
    closeDelete: () => set({ deleting: null }),
}));
