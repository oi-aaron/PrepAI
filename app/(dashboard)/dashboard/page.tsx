import DashboardStats from "@/components/dashboard/DashboardStats";
import ResumeStatus from "@/components/dashboard/ResumeStatus";
import CurrentRoadmap from "@/components/dashboard/CurrentRoadmap";
import RecentInterviews from "@/components/interview/RecentInterviews";

import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth/server";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session?.user) {
    return null;
  }

  const [
    resume,
    scoredInterviews,
    roadmap,
    recentInterviews,
  ] = await Promise.all([
    prisma.resume.findUnique({
      where: {
        userId: session.user.id,
      },
      select: {
        extractedText: true,
      },
    }),

    prisma.interviewSession.findMany({
      where: {
        userId: session.user.id,
        score: {
          not: null,
        },
      },
      select: {
        score: true,
      },
    }),

    prisma.roadmap.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        title: true,
        progress: true,
      },
    }),

    prisma.interviewSession.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        company: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
  ]);

  const interviewCount = scoredInterviews.length;

  const averageScore =
    interviewCount === 0
      ? 0
      : Math.round(
          scoredInterviews.reduce(
            (sum, interview) =>
              sum + (interview.score ?? 0),
            0
          ) / interviewCount
        );

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Welcome back👋
        </h1>

        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Your AI Interview Preparation Hub
        </p>
      </div>

      <DashboardStats
        resumeReady={!!resume?.extractedText}
        interviewCount={interviewCount}
        averageScore={averageScore}
        roadmapProgress={roadmap?.progress ?? 0}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <ResumeStatus
          resumeReady={!!resume?.extractedText}
        />

<CurrentRoadmap
  id={roadmap?.id}
  title={roadmap?.title ?? "No roadmap yet"}
  progress={roadmap?.progress ?? 0}
/>

        <RecentInterviews
          interviews={recentInterviews}
        />
      </div>
    </>
  );
}