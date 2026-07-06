"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Company } from "@prisma/client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { generateRoadmapAction } from "@/lib/actions/roadmap";

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({
  company,
}: CompanyCardProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Card className="flex h-full flex-col justify-between">
      <div>
        <CardHeader>
          <CardTitle>{company.name}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {company.industry && (
            <p className="text-sm text-muted-foreground">
              {company.industry}
            </p>
          )}

          {company.description && (
            <p className="text-sm">
              {company.description}
            </p>
          )}
        </CardContent>
      </div>

      <CardFooter>
        <Button
          className="w-full"
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              try {
                const result = await generateRoadmapAction(
                  company.id
                );

                toast.success("Roadmap ready!");

                router.push(
                  `/roadmap/${result.roadmap.id}`
                );
              } catch (err) {
                toast.error(
                  err instanceof Error
                    ? err.message
                    : "Something went wrong."
                );
              }
            })
          }
        >
          {isPending
            ? "Generating..."
            : "Generate Roadmap"}
        </Button>
      </CardFooter>
    </Card>
  );
}