import Link from "next/link";
import { InterviewSession, Company } from "@prisma/client";
import { Plus } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  interviews: (InterviewSession & {
    company: Company | null;
  })[];
}

export default function RecentInterviews({
  interviews,
}: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Recent Interviews
        </CardTitle>

        <Link href="/interview">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New
          </Button>
        </Link>
      </CardHeader>

      <CardContent>
        {interviews.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No interviews yet.
          </p>
        ) : (
          <div className="space-y-4">
            {interviews.map((interview) => (
              <div
                key={interview.id}
                className="rounded-lg border p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {interview.company?.name ??
                        "Unknown Company"}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {interview.title}
                    </p>
                  </div>

                  <Badge>
                    {interview.status}
                  </Badge>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm">
                    {interview.score != null ? (
                      <span className="font-medium">
                        {interview.score}/100
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        Not graded
                      </span>
                    )}
                  </div>

                  <Link
                    href={
                      interview.status ===
                      "COMPLETED"
                        ? `/interview/${interview.id}/report`
                        : `/interview/${interview.id}`
                    }
                  >
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      {interview.status ===
                      "COMPLETED"
                        ? "View Report"
                        : "Continue"}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}