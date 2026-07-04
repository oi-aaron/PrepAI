"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import {
  extractResumeText,
  analyzeResumeWithAI,
} from "@/lib/ai/resume";

export async function analyzeResume() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const resume = await prisma.resume.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!resume) {
    throw new Error("Resume not found.");
  }

  // Optional cache
  if (resume.analysis) {
    return resume.analysis;
  }

  const extractedText = await extractResumeText(resume.fileUrl);

  const analysis = await analyzeResumeWithAI(extractedText);

  await prisma.resume.update({
    where: {
      userId: session.user.id,
    },
    data: {
      extractedText,
      analysis,
    },
  });

  return analysis;
}