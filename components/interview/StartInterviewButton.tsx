"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { startInterviewAction } from "@/lib/actions/interview";

interface Props {
  companyId: string;
  type: "TECHNICAL" | "BEHAVIORAL" | "SYSTEM_DESIGN" | "MIXED";
  difficulty: "EASY" | "MEDIUM" | "HARD";
}

export default function StartInterviewButton({
  companyId,
  type,
  difficulty,
}: Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      try {
        const interviewId = await startInterviewAction(
          companyId,
          type,
          difficulty
        );

        router.push(`/interview/${interviewId}`);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Something went wrong."
        );
      }
    });
  }

  return (
    <Button
      disabled={isPending}
      onClick={handleClick}
    >
      {isPending ? "Starting..." : "Start Interview"}
    </Button>
  );
}