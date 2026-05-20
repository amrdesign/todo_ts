// src/features/auth/api.ts
import { api } from '@/lib/axios.ts';

export interface User {
    id: number;
    name: string;
    email: string;
    // أضف أي حقول تانية هنا
}

export interface LoginCredentials {
    email: string;
    password: string;
}



export interface AuthResponse {
    token?: string; // اختياري: لو الـ Backend بيبعت توكن
    user: User;
    message?: string;
}


export const authApi = {

    // 1. طلب الـ CSRF Cookie (مطلوب لو بتستخدم Sanctum Cookies)
    getCsrfCookie: () => api.get('/sanctum/csrf-cookie'),


    // 2. تسجيل الدخول
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        // نطلب الـ CSRF الأول (لو الـ Backend محتاجه)
        await authApi.getCsrfCookie();
        console.log(document.cookie);

        const response = await api.post<AuthResponse>('/front/login', credentials);
        return response.data;
    },

    // 3. جلب بيانات المستخدم الحالي
    getCurrentUser: () => api.get<User>('/front/me'),

    // 4. تسجيل الخروج
    logout: () => api.post('/front/logout'),
};



