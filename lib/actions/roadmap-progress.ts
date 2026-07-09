"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth/server";

type RoadmapTask = {
  id: string;
  title: string;
  description?: string;
};

type RoadmapWeek = {
  title: string;
  tasks: RoadmapTask[];
};

type RoadmapContent = {
  weeks: RoadmapWeek[];
};

export async function toggleTaskCompletion(
  roadmapId: string,
  taskId: string
) {
  const session = await getServerSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const roadmap = await prisma.roadmap.findUnique({
    where: {
      id: roadmapId,
    },
  });

  if (!roadmap) {
    throw new Error("Roadmap not found.");
  }

  if (roadmap.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  const completedTasks = Array.isArray(roadmap.completedTasks)
    ? [...(roadmap.completedTasks as string[])]
    : [];

  const index = completedTasks.indexOf(taskId);

  if (index >= 0) {
    completedTasks.splice(index, 1);
  } else {
    completedTasks.push(taskId);
  }

  const content = roadmap.content as RoadmapContent;

  const totalTasks = content.weeks.reduce(
    (total, week) => total + week.tasks.length,
    0
  );

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks.length / totalTasks) * 100);

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