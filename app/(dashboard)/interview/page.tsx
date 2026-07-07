import DashboardCard from "@/components/dashboard/DashboardCard";
import InterviewSetup from "@/components/interview/InterviewSetup";

import prisma from "@/lib/prisma";

export default async function InterviewPage() {
  const companies = await prisma.company.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <DashboardCard
      title="AI Mock Interview"
      description="Practice company-specific interviews powered by AI."
    >
      <InterviewSetup companies={companies} />
    </DashboardCard>
  );
}