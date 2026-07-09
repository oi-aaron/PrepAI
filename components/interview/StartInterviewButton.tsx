"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { startInterviewAction } from "@/lib/actions/interview";

interface Props {
  companyId: string;
  type:
    | "TECHNICAL"
    | "BEHAVIORAL"
    | "SYSTEM_DESIGN"
    | "MIXED";
  difficulty: "EASY" | "MEDIUM" | "HARD";
  resumeReady: boolean;
}

export default function StartInterviewButton({
  companyId,
  type,
  difficulty,
  resumeReady,
}: Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!resumeReady) {
      toast.error(
        "Please upload and analyze your resume before starting an interview."
      );
      return;
    }

    startTransition(async () => {
      try {
        const interviewId = await startInterviewAction(
          companyId,
          type,
          difficulty
        );

        toast.success("Interview generated successfully!");

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
      className="w-full"
      onClick={handleClick}
      disabled={isPending || !resumeReady}
    >
      {isPending
        ? "Starting Interview..."
        : resumeReady
        ? "Start Interview"
        : "Analyze Resume First"}
    </Button>
  );
}