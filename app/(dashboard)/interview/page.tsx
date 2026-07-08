import DashboardCard from "@/components/dashboard/DashboardCard";
import InterviewSetup from "@/components/interview/InterviewSetup";

import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth/server";

export default async function InterviewPage() {
  const session = await getServerSession();

  if (!session?.user) {
    return null;
  }

  const [companies, resume, recentInterviews] =
    await Promise.all([
      prisma.company.findMany({
        orderBy: {
          name: "asc",
        },
      }),

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

  const resumeReady = !!resume?.extractedText;

  return (
    <DashboardCard
      title="AI Mock Interview"
      description="Practice company-specific interviews powered by AI."
    >
      <InterviewSetup
        companies={companies}
        resumeReady={resumeReady}
        recentInterviews={recentInterviews}
      />
    </DashboardCard>
  );
}