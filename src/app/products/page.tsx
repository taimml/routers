'use client';

import { queryClient } from "@/src/lib/client/query-client";
import { productSchema } from "@/src/lib/shared/schemas/products";
import { api } from "@/src/server/api";
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



    return (
        <div>
            <p>dsasasaflsfas</p>
        </div>
    )
}