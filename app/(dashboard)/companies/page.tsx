import DashboardCard from "@/components/dashboard/DashboardCard";
import prisma from "@/lib/prisma";
import CompanyGrid from "@/components/company/CompanyGrid";

export default async function CompaniesPage() {
  const companies = await prisma.company.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <DashboardCard
      title="Companies"
      description="Choose a company to generate your personalized roadmap."
    >
      <CompanyGrid companies={companies} />
    </DashboardCard>
  );
}