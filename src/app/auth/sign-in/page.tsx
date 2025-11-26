"use client";

import { authClient } from "@/src/lib/client/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod/v4";

export default function SignIn() {
    const formSchema = z.object({
        email: z.email("Invalid email"),
        password: z.string().min(8, "Password is required, try again"),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {} as z.infer<typeof formSchema>,
    });

    const onFormSubmit = async (data: z.infer<typeof formSchema>) => {
        await authClient.signIn.email(
            {
                email: data.email,
                password: data.password,
            },
            {
                onSuccess: () => {
                    alert("Sign in successful");
                    window.location.href = "/";
                },
            },
        );
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-white">
            <div className="w-sm aspect-square bg-black/30 rounded-sm p-4">
                <form
                    onSubmit={form.handleSubmit(onFormSubmit)}
                    className="flex flex-col gap-4"
                >
                    <input
                        {...form.register("email")}
                        className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
                    />
                    <input
                        {...form.register("password")}
                        className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
                    />
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}
