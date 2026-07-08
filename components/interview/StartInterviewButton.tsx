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
  disabled?: boolean;
}

export default function StartInterviewButton({
  companyId,
  type,
  difficulty,
  disabled = false,
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
      disabled={disabled || isPending}
    >
      {isPending ? "Starting Interview..." : "Start Interview"}
    </Button>
  );
}