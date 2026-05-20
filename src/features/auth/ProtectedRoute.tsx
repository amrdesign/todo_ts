import {type AnyRoute, createRoute, redirect, type RouteComponent} from '@tanstack/react-router';
import { useAuthStore } from './store';


// 1. تعريف نوع الـ Search Params (عشان الـ redirect)
interface ProtectedSearch {
    redirectTo?: string;
}
export function createProtectedRoute<TParentRoute extends AnyRoute,
    const TPath extends string
>(
    getParentRoute: () => TParentRoute,
    path: TPath,
    component: RouteComponent
) {


    return createRoute({
        getParentRoute,
        path,
        // ✅ نضيف نوع للـ beforeLoad context
        beforeLoad: ({ location }: { location: { href: string } }) => {
            const { token } = useAuthStore.getState();

            if (!token) {
                throw redirect({
                    to: '/login',
                    search: {
                        redirectTo: location.href,
                    } satisfies ProtectedSearch, // ✅ Type-safe search
                });
            }
        },
        component,
    });

}
