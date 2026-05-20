import {Link, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import {useAuthStore} from "@/features/auth/store.ts";

function NavMenu() {

            const token = useAuthStore((state) => state.token);

            return (
            <>
                <div className="min-h-screen bg-background">
                    <nav className="border-b p-4">
                        <Link
                            to="/"
                            viewTransition

                            className="mr-4 hover:underline">Home</Link>

                        {!token && (
                            <>
                                <Link to="/login"

                                      viewTransition

                                      className="mr-4 hover:underline">Login</Link>
                                <Link
                                    viewTransition

                                    to="/register" className="mr-4 hover:underline">Register</Link>
                            </>
                        )}

                        {token && (
                            <Link to="/dashboard" className="hover:underline text-primary">
                                Dashboard (Protected)
                            </Link>
                        )}
                    </nav>
                    <main className="p-4">
                        {/* هنا بيتحط محتوى الصفحة */}
                        <Outlet />
                    </main>
                </div>
                <TanStackRouterDevtools position="bottom-right" />
            </>
            );


}

export default NavMenu;