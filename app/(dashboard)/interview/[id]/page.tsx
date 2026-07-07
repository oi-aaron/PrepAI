import DashboardCard from "@/components/dashboard/DashboardCard";
import InterviewPlayer from "@/components/interview/InterviewPlayer";

import { getInterviewSession } from "@/lib/actions/interview-progress";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function InterviewSessionPage({
  params,
}: Props) {
  const { id } = await params;

  const interview = await getInterviewSession(id);

  return (
    <DashboardCard
      title={interview.title}
      description="AI Mock Interview"
    >
      <InterviewPlayer interview={interview} />
    </DashboardCard>
  );
}