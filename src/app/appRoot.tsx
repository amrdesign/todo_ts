import {RouterProvider} from "@tanstack/react-router";
import {router} from "@/app/router.tsx";
import {Toaster} from "sonner";
import PreLoading from "@/shared/ui/preLoading.tsx";
import usePreLoading from "@/shared/store/pre-loading-store.ts";
function AppRoot() {
    const isLoading = usePreLoading((state) => state.show);

    return (
        <>
            <RouterProvider router={router} />
            {isLoading && <PreLoading />}
            <Toaster richColors position="top-right" />
        </>
    );
}


export default AppRoot;