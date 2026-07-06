"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";

import { toggleTaskCompletion } from "@/lib/actions/roadmap-progress";

interface RoadmapTaskProps {
  roadmapId: string;
  taskId: string;

  title: string;
  description: string;
  category: string;

  completed: boolean;
}

export default function RoadmapTask({
  roadmapId,
  taskId,

  title,
  description,
  category,

  completed,
}: RoadmapTaskProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start gap-4">
        <Checkbox
          checked={completed}
          disabled={isPending}
          onCheckedChange={() =>
            startTransition(async () => {
              await toggleTaskCompletion(
                roadmapId,
                taskId
              );

              router.refresh();
            })
          }
        />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4
              className={
                completed
                  ? "font-semibold line-through"
                  : "font-semibold"
              }
            >
              {title}
            </h4>

            <span className="rounded bg-muted px-2 py-1 text-xs">
              {category}
            </span>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}