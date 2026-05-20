import { createRouter, createRoute, createRootRoute} from '@tanstack/react-router';
import { createProtectedRoute } from '../features/auth/ProtectedRoute';

import LoginForm from "@/features/auth/ui/loginForm.tsx";



import {DashBoardPage} from  "@/shared/ui/dashBoardPage.tsx"
import NavMenu from "@/shared/ui/navMenu.tsx";
import {HomePage} from "@/features/home/HomePage.tsx";





// 1. Root Route (اللي هيشوفه كل الـ Pages)
const rootRoute =  createRootRoute({
    component: NavMenu,
});

// 2. تعريف المسارات الأساسية
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <HomePage/>,
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: LoginForm,
});

const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/register',
    component: () => <div className="text-2xl font-bold">📝 Register Page</div>,
});


const dashboardRoute = createProtectedRoute(
    () => rootRoute,
    '/dashboard',
    DashBoardPage
);

// 3. تجميع الـ Routes
const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,
    registerRoute,
    dashboardRoute // ← أضف السطر ده

]);

// 4. إنشاء الـ Router
export const router = createRouter({ routeTree });

// 5. تسجيل الأنواع (مهم جداً عشان الـ Type Safety يشتغل)
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
