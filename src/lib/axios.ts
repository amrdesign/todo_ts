// src/lib/axios.ts
import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
    withCredentials: true, // ← ده السطر السحري! بيفعّل إرسال الـ Cookies
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});