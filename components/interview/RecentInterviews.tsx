import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  InterviewDifficulty,
  InterviewSessionStatus,
  InterviewType,
} from "@prisma/client";

interface Props {
  interviews: {
    id: string;
    title: string;
    type: InterviewType;
    difficulty: InterviewDifficulty;
    status: InterviewSessionStatus;
    score: number | null;
    createdAt: Date;
    company: {
      name: string;
    } | null;
  }[];
}

export default function RecentInterviews({
  interviews,
}: Props) {
  if (interviews.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Recent Interviews
        </h2>

        <Link href="/interview/history">
          <Button variant="outline">
            View Full History
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
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

            <CardContent>
              <div className="grid gap-3 text-sm md:grid-cols-2">
                <p>
                  <span className="font-medium">
                    Difficulty:
                  </span>{" "}
                  {formatLabel(interview.difficulty)}
                </p>

                <p>
                  <span className="font-medium">
                    Created:
                  </span>{" "}
                  {interview.createdAt.toLocaleDateString()}
                </p>

                <p>
                  <span className="font-medium">
                    Score:
                  </span>{" "}
                  {interview.score ?? "-"}
                </p>
              </div>

              <div className="mt-6 flex justify-end">
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