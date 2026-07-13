"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  progress: number;
  roadmapId?: string;
}

export default function CurrentRoadmap({
  title,
  progress,
  roadmapId,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleContinue() {
    if (!roadmapId) return;

    setLoading(true);
    router.push(`/roadmap/${roadmapId}`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Roadmap</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <p className="font-medium">{title}</p>

          <p className="text-sm text-muted-foreground">
            {progress}% completed
          </p>
        </div>

        <Progress value={progress} />

        <Button
          className="w-full"
          onClick={handleContinue}
          disabled={loading || !roadmapId}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Opening...
            </>
          ) : (
            "Continue Learning"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}