import { QueryClient } from "@tanstack/react-query"
import { error } from "console"

export function handleTreatyError(error: Error) {
    console.error(error)
}

export const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            onError: (error) => {
                handleTreatyError(error);
            }
        }
    }
})