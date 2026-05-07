import { useMutation } from '@tanstack/react-query';

import { useAuthStore } from '../store';
import { useNavigate } from '@tanstack/react-router';
import {authApi, type LoginCredentials} from "@/features/auth/api.ts";
import axios from "axios";

export const useLogin = () => {
    const { login: setAuth } = useAuthStore();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),

        onSuccess: (data) => {

            console.log(data);
            // نحفظ البيانات في الـ Store
            setAuth(data.user, data.token);

            // نروح للـ Dashboard
            navigate({ to: '/dashboard' });



        },

        onError: (error: unknown) => {
            //console.error('Login failed:', error.response?.data || error.message);

            if (axios.isAxiosError(error)) {
                console.error("Login failed:", error.response?.data || error.message);
            } else {
                console.error("Login failed:", error);
            }

            // هنا ممكن تعرض Toast Message
        },
    });
};
