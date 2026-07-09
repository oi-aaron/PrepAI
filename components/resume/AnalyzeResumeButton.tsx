"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { analyzeResumeAction } from "@/lib/actions/resume";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AnalyzeResumeButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          try {
            await analyzeResumeAction();

            toast.success("Resume analyzed!");

            router.refresh();
          } catch (err) {
            toast.error(
              err instanceof Error ? err.message : "Something went wrong."
            );
          }
        })
      }
    >
      {isPending ? "Analyzing..." : "Analyze Resume"}
    </Button>
  );
}