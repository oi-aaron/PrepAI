import Link from "next/link";

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

            <Link href="/resume">
              <Button className="w-full">
                View Resume
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Badge variant="destructive">
              Missing
            </Badge>

            <p className="text-sm text-muted-foreground">
              Upload your resume to unlock AI features.
            </p>

            <Link href="/resume">
              <Button className="w-full">
                Upload Resume
              </Button>
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  );
}