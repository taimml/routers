'use client';

import { api } from "@/src/lib/client/api";
import { queryClient } from "@/src/lib/client/query-client";
import { productSchema } from "@/src/lib/shared/schemas/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod/v4";

export default function Products() {
    const { data: products, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
        return (await api.products.get()).data;
        },
    });

    const form = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {} as unknown as z.infer<typeof productSchema>,
    });

const createMutation = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: async (data: z.infer<typeof productSchema>) => {
        const res = await api.products.post(data);
        if (res.error) {
            throw new Error(res.error.value.message);
        }
    },
    onSuccess: () => {
        alert("Product created successfully");
        // form.reset();
        queryClient.invalidateQueries({
            queryKey: ["products"],
        });
    },
    onError: (error) => {
        alert(error.message);
        },
    });

    const handleSubmit = (data: z.infer<typeof productSchema>) => {
        createMutation.mutate(data);
    };

    const onError = (error: any) => {
        console.log(error);
    };

    return (
        <div className=" container mx-auto mt-20 flex flex-col gap-4">
        <p>{products?.length}</p>
        {products?.map((p) => (
            <div className="flex flex-col gap-4 p-4 rounded-xl bg-red-300">
            <p>{p.name}</p>
            <p>{p.description}</p>
            <p>{p.price}</p>
            </div>
        ))}
        <form
            onSubmit={form.handleSubmit(handleSubmit)}
            onError={onError}
            className="flex flex-col gap-4"
        >
            <input className="bg-white text-black" {...form.register("name")} />
            <input
            className="bg-white text-black"
            {...form.register("description")}
            />
            <input
            className="bg-white text-black"
            {...form.register("price", { valueAsNumber: true })}
            type="number"
            />
            <input className="bg-white text-black" {...form.register("image")} />
            {/* <button onClick={() => createMutation.mutate(form.getValues())}>
            Create
            </button> */}
            <button className="bg-red-500 text-white" type="submit">
            Create
            </button>
        </form>
        </div>
    )
}