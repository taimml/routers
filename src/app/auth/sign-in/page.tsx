"use client";

import { authClient } from "@/src/lib/client/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod/v4";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        <div className="w-sm aspect-square bg-black/20 rounded-sm p-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onFormSubmit)}
                    className="flex flex-col gap-6"
                >
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                placeholder="ivanov@mail.ru"
                                className="h-12 bg-neutral-200"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                    type="password"
                                    {...field}
                                    placeholder="**********"
                                    className="h-12 bg-neutral-200"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Sign In</Button>
                </form>
            </Form>
        </div>
    </div>
    );
}
