import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),

        NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),

        MAIN_ADMIN_EMAIL: z.string(),
        MAIN_ADMIN_PASSWORD: z.string(),

        S3_REGION: z.string(),
        S3_ENDPOINT: z.string(),
        S3_BUCKET: z.string(),
        S3_ACCESS_KEY: z.string(),
        S3_SECRET_KEY: z.string(),
        S3_BUCKET: z.string(),

        REDIS_URL: z.string().url(),
    },

    client: {},

    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,

        MAIN_ADMIN_EMAIL: process.env.MAIN_ADMIN_EMAIL,
        MAIN_ADMIN_PASSWORD: process.env.MAIN_ADMIN_PASSWORD,

        S3_REGION: process.env.S3_REGION,
        S3_ENDPOINT: process.env.S3_ENDPOINT,
        S3_BUCKET: process.env.S3_BUCKET,
        S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
        S3_SECRET_KEY: process.env.S3_SECRET_KEY,
        S3_BUCKET: process.env.S3_BUCKET,

        REDIS_URL: process.env.REDIS_URL,
    },
    // skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    skipValidation: true,
    emptyStringAsUndefined: true,
});