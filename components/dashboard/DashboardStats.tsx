import DashboardStatCard from "./DashboardStatCard";

import {
  FileText,
  Map,
  Trophy,
  Mic,
} from "lucide-react";

interface Props {
  resumeReady: boolean;
  interviewCount: number;
  averageScore: number;
  roadmapProgress: number;
}

export default function DashboardStats({
  resumeReady,
  interviewCount,
  averageScore,
  roadmapProgress,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <DashboardStatCard
        title="Resume"
        value={resumeReady ? "Ready" : "Missing"}
        description={
          resumeReady
            ? "Resume analyzed"
            : "Upload your resume"
        }
        icon={<FileText className="size-5 text-primary" />}
      />

      <DashboardStatCard
        title="Interviews"
        value={interviewCount}
        description="Completed mock interviews"
        icon={<Mic className="size-5 text-primary" />}
      />

      <DashboardStatCard
        title="Average Score"
        value={`${averageScore}%`}
        description="Across all interviews"
        icon={<Trophy className="size-5 text-primary" />}
      />

      <DashboardStatCard
        title="Roadmap"
        value={`${roadmapProgress}%`}
        description="Learning progress"
        icon={<Map className="size-5 text-primary" />}
      />
    </div>
  );
}