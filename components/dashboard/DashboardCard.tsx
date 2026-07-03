import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export default function DashboardCard({
  title,
  description,
  children,
}: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>

        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
}