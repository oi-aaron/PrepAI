import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { InterviewSessionStatus } from "@prisma/client";

interface Props {
  interviews: {
    id: string;
    title: string;
    type: string;
    difficulty: string;
    status: InterviewSessionStatus;
    score: number | null;
    createdAt: Date;
    completedAt: Date | null;
    company: {
      name: string;
    } | null;
  }[];
}

export default function InterviewHistory({
  interviews,
}: Props) {
  if (!interviews.length) {
    return (
      <div className="rounded-lg border p-12 text-center">
        <h2 className="text-xl font-semibold">
          No Interviews Yet
        </h2>

        <p className="mt-2 text-muted-foreground">
          Start your first AI mock interview to begin
          tracking your progress.
        </p>

        <div className="mt-6">
          <Link href="/interview">
            <Button>
              Start Interview
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {interviews.map((interview) => (
        <Card key={interview.id}>
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>
                {interview.company?.name ??
                  "Unknown Company"}
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                {formatLabel(interview.type)} Interview
              </p>
            </div>

            <StatusBadge status={interview.status} />
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-4 text-sm md:grid-cols-2">
              <div>
                <span className="font-medium">
                  Difficulty:
                </span>{" "}
                {formatLabel(interview.difficulty)}
              </div>

              <div>
                <span className="font-medium">
                  Score:
                </span>{" "}
                {interview.score ?? "-"}
              </div>

              <div>
                <span className="font-medium">
                  Created:
                </span>{" "}
                {interview.createdAt.toLocaleDateString()}
              </div>

              <div>
                <span className="font-medium">
                  Completed:
                </span>{" "}
                {interview.completedAt
                  ? interview.completedAt.toLocaleDateString()
                  : "-"}
              </div>
            </div>

            <div className="flex justify-end">
              {interview.status === "COMPLETED" ? (
                <Link
                  href={`/interview/${interview.id}/report`}
                >
                  <Button>
                    View Report
                  </Button>
                </Link>
              ) : (
                <Link
                  href={`/interview/${interview.id}`}
                >
                  <Button>
                    Continue Interview
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: InterviewSessionStatus;
}) {
  switch (status) {
    case "COMPLETED":
      return <Badge>Completed</Badge>;

    case "IN_PROGRESS":
      return (
        <Badge variant="secondary">
          In Progress
        </Badge>
      );

    case "SCHEDULED":
      return (
        <Badge variant="outline">
          Scheduled
        </Badge>
      );

    case "CANCELLED":
      return (
        <Badge variant="destructive">
          Cancelled
        </Badge>
      );

    default:
      return <Badge>{status}</Badge>;
  }
}

function formatLabel(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}