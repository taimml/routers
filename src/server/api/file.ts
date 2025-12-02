import sharp from "sharp";
import { getPlaiceholder } from "plaiceholder";
import mime from "mime-types"
import { db } from "../db";
import { files } from "../db/schema";
import { s3 } from "bun";
import { meta } from "zod/v4/core";
import Elysia, { t } from "elysia";
import z4, { z } from "zod/v4";
import { eq } from "drizzle-orm";


export async function UploadFile({
    file,
    isImage
}: {
    file: File,
    isImage: boolean
}) {
    const arrayBuffer = await file.arrayBuffer();

    let buf: Buffer<ArrayBufferLike> = Buffer.from(arrayBuffer);

    if(isImage) {
        buf = await sharp(buf).webp().toBuffer();
    }

    const placeholder = isImage ? (await getPlaiceholder(buf)).base64 : undefined;

    const mimeType = mime.extension(file.name);

    const resolvedMimeType = mimeType ? mimeType : "application/octet-stream";

    let id: string | undefined;
    
    await db.transaction(async (tx) => {
        const [f] = await tx.insert(files).values({
            fileName: file.name,
            fileSize: file.size,
            contentType: resolvedMimeType,
            placeholder
        })

        .returning()

        id = f.id;

        const metadata = s3.file(id);
        await metadata.write(buf, {
            type: resolvedMimeType
        })
    })

    return id
}

export const fileRouter = new Elysia({
    prefix: "/file"
})
.post("/", async ({body}) => {
    const id = await UploadFile({
        file: body.file,
        isImage: true
    })
}, {
    body: z.object({
        file: z.file(),
        isImage: z.boolean().optional()
    })
})

.get("/:id", async ({ params, set }) => {
    const file = await db.query.files.findFirst({
        where: eq(files.id, params.id),
    });

    if (!file) {
        return
    }

    set.headers["Content-Type"] = file.contentType;
    set.headers["Content-Disposition"] =
        `attachment; filename="${encodeURIComponent(file.fileName)}"`;
    return s3.file(file.id).stream();
    },
    {
    params: t.Object({
        id: t.String(),
    }),
    },
);