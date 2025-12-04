const globalForS3 = globalThis as unknown as {
    s3: Bun.S3Client | undefined
}

export const s3 = globalForS3 ?? new Bun.S3Client({
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    bucket: process.env.S3_BUCKET,
})