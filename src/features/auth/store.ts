import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {User} from "@/features/auth/api.ts";


interface AuthState {
    user: User | null;
    token: string | null; // لو الـ Backend بيبعت توكن
    isAuthenticated: boolean;

    // Actions
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    login: (user: User, token?: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            setUser: (user) => set({ user, isAuthenticated: !!user }),
            setToken: (token) => set({ token }),

            login: (user, token) => set({
                user,
                token: token ?? null,
                isAuthenticated: true
            }),

            logout: () => set({ user: null, token: null, isAuthenticated: false }),
        }),
        {
            name: 'todo-auth',
            // نحفظ الـ token بس في الـ storage (الـ user ممكن يتغير من الـ API)
            partialize: (state) => ({ token: state.token }),
        }
    )
);