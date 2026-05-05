import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    setAuth: (token: string, user: User) => void;
    clearAuth: () => void;
}

// في المتصفح console:


export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            setAuth: (token, user) => set({token, user}),
            clearAuth: () => set({token: null, user: null}),
        }),
        {name: 'todo-auth'}
    )
);


function testAuth(login: boolean) {


    if (login) {
        useAuthStore.getState().setAuth('test-token', {
            id: 1,
            name: 'Amr',
            email: 'amr@test.com'
        });
    } else {
        useAuthStore.getState().clearAuth();
    }

}


testAuth(true);