import { notFound } from "next/navigation";

import DashboardCard from "@/components/dashboard/DashboardCard";
import RoadmapView from "@/components/roadmap/RoadmapView";
import prisma from "@/lib/prisma";
import { RoadmapContent } from "@/lib/types/roadmap";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function RoadmapPage({ params }: Props) {
  const { id } = await params;

  const roadmap = await prisma.roadmap.findUnique({
    where: {
      id,
    },
  });

  if (!roadmap) {
    notFound();
  }

  return (
    <DashboardCard
      title={roadmap.title}
      description={roadmap.targetRole ?? ""}
    >
      <RoadmapView
        roadmapId={roadmap.id}
        roadmap={roadmap.content as unknown as RoadmapContent}
        completedTasks={roadmap.completedTasks as unknown as string[]}
        progress={roadmap.progress}
    />
    </DashboardCard>
  );
}