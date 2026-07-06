"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth/server";

export async function toggleTaskCompletion(
  roadmapId: string,
  taskId: string
) {
  const session = await getServerSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Fetch roadmap
  const roadmap = await prisma.roadmap.findUnique({
    where: {
      id: roadmapId,
    },
  });

  if (!roadmap) {
    throw new Error("Roadmap not found.");
  }

  // Ensure the roadmap belongs to the logged-in user
  if (roadmap.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  // Read completed tasks
  const completedTasks = Array.isArray(roadmap.completedTasks)
    ? [...(roadmap.completedTasks as string[])]
    : [];

  // Toggle task
  const index = completedTasks.indexOf(taskId);

  if (index >= 0) {
    completedTasks.splice(index, 1);
  } else {
    completedTasks.push(taskId);
  }

  // Calculate total tasks
  const content = roadmap.content as any;

  const totalTasks = content.weeks.reduce(
    (total: number, week: any) => total + week.tasks.length,
    0
  );

  // Calculate progress
  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks.length / totalTasks) * 100);

  // Save
  await prisma.roadmap.update({
    where: {
      id: roadmapId,
    },
    data: {
      completedTasks,
      progress,
    },
  });

  return {
    success: true,
    completedTasks,
    progress,
  };
}