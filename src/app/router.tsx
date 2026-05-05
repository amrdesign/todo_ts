import { createRouter, createRoute,Outlet, createRootRoute, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { createProtectedRoute } from '../features/auth/ProtectedRoute';
import {useAuthStore} from "@/features/auth/store.ts";


// 1. Root Route (اللي هيشوفه كل الـ Pages)
const rootRoute =  createRootRoute({
    component: () => (
        <>
            <div className="min-h-screen bg-background">
                <nav className="border-b p-4">
                    <Link to="/" className="mr-4 hover:underline">Home</Link>
                    <Link to="/login" className="mr-4 hover:underline">Login</Link>
                    <Link to="/register" className="mr-4 hover:underline">Register</Link>
                    <Link to="/dashboard" className="hover:underline text-primary">
                        Dashboard (Protected)
                    </Link>
                </nav>
                <main className="p-4">
                    {/* هنا بيتحط محتوى الصفحة */}
                    <Outlet />

                </main>
            </div>
            <TanStackRouterDevtools position="bottom-right" />

        </>
    ),
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
    component: () => <div className="text-2xl font-bold">🔐 Login Page</div>,
});

const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/register',
    component: () => <div className="text-2xl font-bold">📝 Register Page</div>,
});


const dashboardRoute = createProtectedRoute(
    () => rootRoute,
    '/dashboard',
    () => (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">📊 Dashboard</h1>
            <p className="text-muted-foreground">
                دي صفحة محمية. لو مش مسجل دخول، هتترجع لـ login تلقائياً.
            </p>

            <button
                onClick={() => useAuthStore.getState().clearAuth()}
                className="px-4 py-2 bg-red-500 text-white rounded"
            >
                Logout
            </button>

            <Link to="/" className="text-primary hover:underline">
                ← رجّع للـ Home
            </Link>
        </div>
    )
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