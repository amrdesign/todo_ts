import {useAuthStore} from "@/features/auth/store.ts";
import {Link, useNavigate} from "@tanstack/react-router";

export function DashBoardPage() {
    const navigate = useNavigate();

    return (
        <>

            <div className="space-y-4">
                <h1 className="text-2xl font-bold">📊 Dashboard</h1>
                <p className="text-muted-foreground">
                    دي صفحة محمية. لو مش مسجل دخول، هتترجع لـ login تلقائياً.
                </p>

                <button
                    onClick={async() => {
                        useAuthStore.getState().logout();
                        await navigate({ to: '/login' });
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                >
                    Logout
                </button>

                <Link to="/" className="text-primary hover:underline">
                    ← رجّع للـ Home
                </Link>
            </div>

        </>
    );
}