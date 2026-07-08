import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
}

export default function DashboardStatCard({
  title,
  value,
  description,
  icon,
}: Props) {
  return (
    <Card className="border-border/60 bg-card/70 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>

        <div className="rounded-xl bg-primary/10 p-2 text-primary">
          {icon}
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold tracking-tight">
          {value}
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}