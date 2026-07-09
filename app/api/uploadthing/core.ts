import { createUploadthing, type FileRouter } from "uploadthing/next";
import { headers } from "next/headers";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth/auth";

const f = createUploadthing();

export const ourFileRouter = {
  resumeUploader: f({
    pdf: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session?.user) {
        throw new Error("Unauthorized");
      }

      return {
        userId: session.user.id,
      };
    })

    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.resume.upsert({
        where: {
          userId: metadata.userId,
        },

        update: {
          fileKey: file.key,
          fileName: file.name,
          fileUrl: file.url,
          fileSize: file.size,
          mimeType: file.type,

          // Reset previous AI results when a new resume is uploaded
          extractedText: null,
          analysis: Prisma.JsonNull,
        },

        create: {
          userId: metadata.userId,
          fileKey: file.key,
          fileName: file.name,
          fileUrl: file.url,
          fileSize: file.size,
          mimeType: file.type,
        },
      });

      return {
        uploaded: true,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;