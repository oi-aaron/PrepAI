import { redirect } from "next/navigation";

import DashboardCard from "@/components/dashboard/DashboardCard";
import InterviewReport from "@/components/interview/InterviewReport";

import { getInterviewSession } from "@/lib/actions/interview-progress";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function InterviewReportPage({
  params,
}: Props) {
  const { id } = await params;

  const interview = await getInterviewSession(id);

  // Prevent users from viewing the report before evaluation
  if (!interview.feedback) {
    redirect(`/interview/${id}`);
  }

  return (
    <DashboardCard
      title="Interview Report"
      description="Your AI interview evaluation"
    >
      <InterviewReport interview={interview} />
    </DashboardCard>
  );
}