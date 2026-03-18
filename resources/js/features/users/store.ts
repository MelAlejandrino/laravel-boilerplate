import { create } from 'zustand';
import type { User, UserMode } from './types';

interface UserStore {
    mode: UserMode;
    selected: User | null;
    deleting: User | null;
    open: (mode: UserMode, user?: User) => void;
    close: () => void;
    openDelete: (user: User) => void;
    closeDelete: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    mode: '',
    selected: null,
    deleting: null,
    open: (mode, user = undefined) => set({ mode, selected: user }),
    close: () => set({ mode: '', selected: null }),
    openDelete: (user) => set({ deleting: user }),
    closeDelete: () => set({ deleting: null }),
}));
