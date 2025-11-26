import { createAuthClient } from "better-auth/client";

let baseURL = "";
if (typeof window !== "undefined") {
    baseURL = window.location.origin;
}

export const authClient = createAuthClient({
    baseURL
})