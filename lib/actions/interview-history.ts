"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth/server";

export async function getInterviewHistory() {
  const session = await getServerSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return prisma.interviewSession.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      company: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}