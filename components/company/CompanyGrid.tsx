import { Company } from "@prisma/client";
import CompanyCard from "./CompanyCard";

interface CompanyGridProps {
  companies: Company[];
}

export default function CompanyGrid({
  companies,
}: CompanyGridProps) {
  if (companies.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">
          No companies found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <CompanyCard
          key={company.id}
          company={company}
        />
      ))}
    </div>
  );
}