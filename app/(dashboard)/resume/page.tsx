import DashboardCard from "@/components/dashboard/DashboardCard";
import ResumeManager from "@/components/resume/ResumeManager";
import { getCurrentUserResume } from "@/lib/actions/resume";

export default async function ResumePage() {
  const resume = await getCurrentUserResume();

  return (
    <DashboardCard
      title="Resume"
      description="Upload and manage your resume."
    >
      <ResumeManager resume={resume} />
    </DashboardCard>
  );
}