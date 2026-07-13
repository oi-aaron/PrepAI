"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  InterviewDifficulty,
  InterviewSessionStatus,
  InterviewType,
} from "@prisma/client";
import { Loader2, Plus } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type RecentInterview = {
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
};

interface Props {
  interviews: RecentInterview[];
}

export default function RecentInterviews({
  interviews,
}: Props) {
  const router = useRouter();

  const [loadingNew, setLoadingNew] = useState(false);
  const [loadingInterview, setLoadingInterview] = useState<string | null>(null);

  function handleNewInterview() {
    setLoadingNew(true);
    router.push("/interview");
  }

  function handleInterviewClick(interview: RecentInterview) {
    setLoadingInterview(interview.id);

    router.push(
      interview.status === "COMPLETED"
        ? `/interview/${interview.id}/report`
        : `/interview/${interview.id}`
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Interviews</CardTitle>

        <Button
          size="sm"
          onClick={handleNewInterview}
          disabled={loadingNew}
        >
          {loadingNew ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Opening...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              New
            </>
          )}
        </Button>
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
                      {interview.company?.name ?? "Unknown Company"}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {interview.title}
                    </p>
                  </div>

                  <Badge>{interview.status}</Badge>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm">
                    {interview.score !== null ? (
                      <span className="font-medium">
                        {interview.score}/100
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        Not graded
                      </span>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={loadingInterview === interview.id}
                    onClick={() => handleInterviewClick(interview)}
                  >
                    {loadingInterview === interview.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        
                      </>
                    ) : interview.status === "COMPLETED" ? (
                      "View Report"
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}