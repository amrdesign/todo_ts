import { createRouter, createRoute,Outlet, createRootRoute, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

// 1. Root Route (اللي هيشوفه كل الـ Pages)
const rootRoute =  createRootRoute({
    component: () => (
        <>
            <div className="min-h-screen bg-background">
                <nav className="border-b p-4">
                    <Link to="/" className="mr-4 hover:underline">Home</Link>
                    <Link to="/login" className="mr-4 hover:underline">Login</Link>
                    <Link to="/register" className="hover:underline">Register</Link>
                </nav>
                <main className="p-4">
                    {/* هنا بيتحط محتوى الصفحة */}
                    <Outlet />

                </main>
            </div>
            <TanStackRouterDevtools />
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

// 3. تجميع الـ Routes
const routeTree = rootRoute.addChildren([indexRoute, loginRoute, registerRoute]);

// 4. إنشاء الـ Router
export const router = createRouter({ routeTree });

// 5. تسجيل الأنواع (مهم جداً عشان الـ Type Safety يشتغل)
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}