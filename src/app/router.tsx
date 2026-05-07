import { createRouter, createRoute, createRootRoute, Link, useNavigate } from '@tanstack/react-router';
import { createProtectedRoute } from '../features/auth/ProtectedRoute';

import LoginForm from "@/features/auth/ui/loginForm.tsx";



import { useAuthStore } from "@/features/auth/store";
import NavMenu from "@/shared/ui/navMenu.tsx";

function DashboardPage() {
    const navigate = useNavigate();

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">📊 Dashboard</h1>
            <p className="text-muted-foreground">
                دي صفحة محمية. لو مش مسجل دخول، هتترجع لـ login تلقائياً.
            </p>

            <button
                onClick={() => {
                    useAuthStore.getState().logout();
                    navigate({ to: '/login' });
                }}
                className="px-4 py-2 bg-red-500 text-white rounded"
            >
                Logout
            </button>

            <Link to="/" className="text-primary hover:underline">
                ← رجّع للـ Home
            </Link>
        </div>
    );
}



// 1. Root Route (اللي هيشوفه كل الـ Pages)
const rootRoute =  createRootRoute({
    component: NavMenu,
});

// 2. تعريف المسارات الأساسية
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <div className="text-2xl font-bold text-black">🏠 Home Page</div>,
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
    DashboardPage
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
