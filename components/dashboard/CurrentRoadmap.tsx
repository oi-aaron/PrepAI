import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface Props {
  id?: string,
  title: string;
  progress: number;
}

export default function CurrentRoadmap({
  id,
  title,
  progress,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Roadmap</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <p className="font-medium">
            {title}
          </p>

          <p className="text-sm text-muted-foreground">
            {progress}% completed
          </p>
        </div>

        <Progress value={progress} />

        {id ? (
  <Link href={`/roadmap/${id}`}>
    <Button className="w-full">
      Continue Learning
    </Button>
  </Link>
) : (
  <Button
    className="w-full"
    disabled
  >
    Generate a Roadmap First
  </Button>
)}
      </CardContent>
    </Card>
  );
}