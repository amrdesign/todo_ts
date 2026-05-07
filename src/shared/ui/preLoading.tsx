import { LoaderCircle} from "lucide-react"

import {cn} from "@/lib/utils"
import * as React from "react";

function Spinner({className, ...props}: React.ComponentProps<"svg">) {
    return (


        <>


            <LoaderCircle
                strokeWidth={0.75}
                role="status"
                aria-label="Loading"
                className={cn("size-30 animate-spin", className)}
                {...props} />
        </>
    )
}

function PreLoading() {
    return (

        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="flex items-center gap-4 ">
                <Spinner/>
            </div>
        </section>


    )
}

export default PreLoading

