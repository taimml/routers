import { auth } from "../../auth/auth";

export const userMiddleWare = async (headers: Record<string, string | undefined>) => {
    const realHeaders = new Headers()
    for (const [key, value] of Object.entries(headers)) {
        if(!value) continue;
        realHeaders.set(key, value)
    }

    return {
        session: await auth.api.getSession({ headers: realHeaders})
    }
}