import DashboardCard from "@/components/dashboard/DashboardCard";
import InterviewHistory from "@/components/interview/InterviewHistory";

import { getInterviewHistory } from "@/lib/actions/interview-history";

export default async function InterviewHistoryPage() {
  const interviews = await getInterviewHistory();

  return (
    <DashboardCard
      title="Interview History"
      description="Review your previous AI mock interviews."
    >
      <InterviewHistory interviews={interviews} />
    </DashboardCard>
  );
}