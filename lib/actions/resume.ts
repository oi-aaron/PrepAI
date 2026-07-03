import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth/server";

export async function getCurrentUserResume() {
  const session = await getServerSession();

  if (!session?.user) {
    return null;
  }

  return prisma.resume.findUnique({
    where: {
      userId: session.user.id,
    },
  });
}