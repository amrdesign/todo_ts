
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import axios from "axios"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import usePreLoading from "@/shared/store/pre-loading-store.ts";
import {useLogin} from "@/features/auth/hooks/useLogin.ts";
import {useEffect} from "react";


const formSchema = z.object({
    email: z
        .email("Please enter a valid email address."),
    password: z
        .string()
        .min(2, "Description must be at least 20 characters.")
        .max(100, "Description must be at most 100 characters."),
})
function LoginForm(){
    const setPreLoading = usePreLoading((s) => s.setShow);
    const { mutateAsync, isPending, error } = useLogin();




    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {

            setPreLoading(true);

            try {



                await mutateAsync({
                    email: value.email.trim(),
                    password: value.password,
                });

//                const [success, data] = await login(value.email.trim(), value.password)
  //              console.log(data)





               /* if(success){
                    toast.success("Login done")
                }else{
                    toast.error("Login failed")
                }*/


            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const backendMessage =
                        error.response?.data?.message ||
                        Object.values(error.response?.data?.errors || {})
                            .flat()
                            .join("\n")
                    toast.error(backendMessage || "Login failed")
                    return
                }
                toast.error("Login failed")
                return
            } finally {
                setPreLoading(false);
            }

        },
    })

    useEffect(() => {
        if (!error) return;
        toast.error(error instanceof Error ? error.message : "فشل تسجيل الدخول");
    }, [error]);


    return(
        <>







            <section className="flex flex-row content-center justify-center">
            <Card className="w-full sm:max-w-md ">
                <CardHeader>
                    <CardTitle>Login Form</CardTitle>

                </CardHeader>
                <CardContent>
                    <form
                        id="bug-report-form"
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                    >
                        <FieldGroup>
                            <form.Field
                                name="email"
                                children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>User</FieldLabel>
                                            <Input

                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                aria-invalid={isInvalid}
                                                placeholder="Login button not working on mobile"
                                                autoComplete="off"
                                            />
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    )
                                }}
                            />


                            <form.Field
                                name="password"
                                children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                            <Input
                                                type="password"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                aria-invalid={isInvalid}
                                                placeholder="Login button not working on mobile"
                                                autoComplete="off"
                                            />
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    )
                                }}
                            />






                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter>
                    <Field orientation="horizontal">
                        <Button type="button" variant="outline" onClick={() => form.reset()}>
                            Reset
                        </Button>
                        <Button type="submit" form="bug-report-form" disabled={form.state.isSubmitting}>
                            {isPending ? 'Login .....' : 'Login'}
                        </Button>
                    </Field>
                </CardFooter>
            </Card>
            </section>
        </>
    )
}


export default LoginForm;
