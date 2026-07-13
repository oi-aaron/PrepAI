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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  resumeReady: boolean;
}

export default function ResumeStatus({
  resumeReady,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    router.push("/resume");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {resumeReady ? (
          <>
            <Badge>Analyzed</Badge>

            <p className="text-sm text-muted-foreground">
              Your resume has been uploaded and analyzed by AI.
            </p>

            <Button
              className="w-full"
              onClick={handleClick}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Opening...
                </>
              ) : (
                "View Resume"
              )}
            </Button>
          </>
        ) : (
          <>
            <Badge variant="destructive">
              Missing
            </Badge>

            <p className="text-sm text-muted-foreground">
              Upload your resume to unlock AI features.
            </p>

            <Button
              className="w-full"
              onClick={handleClick}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Opening...
                </>
              ) : (
                "Upload Resume"
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}