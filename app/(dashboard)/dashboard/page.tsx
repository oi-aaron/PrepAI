import DashboardCard from "@/components/dashboard/DashboardCard";

export default function DashboardPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Welcome back 👋
        </h1>

        <p className="mt-2 text-muted-foreground">
          Your AI Interview Preparation Hub
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <DashboardCard
          title="Resume"
          description="Upload and analyze your resume with AI."
        />

        <DashboardCard
          title="AI Roadmap"
          description="Generate a personalized interview roadmap."
        />

        <DashboardCard
          title="Mock Interview"
          description="Practice technical interviews."
        />

        <DashboardCard
          title="Recent Activity"
          description="Track your preparation history."
        />
      </div>
    </>
  );
}