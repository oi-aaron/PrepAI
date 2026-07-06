import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  import { Badge } from "@/components/ui/badge";
  
  import { RoadmapContent } from "@/lib/types/roadmap";
  
  interface Props {
    roadmap: RoadmapContent;
  }
  
  export default function RoadmapView({
    roadmap,
  }: Props) {
    return (
      <div className="space-y-8">
        {/* Header */}
  
        <div>
          <h2 className="text-3xl font-bold">
            {roadmap.title}
          </h2>
  
          <p className="mt-2 text-muted-foreground">
            {roadmap.overview}
          </p>
  
          <Badge className="mt-4">
            {roadmap.estimatedDuration}
          </Badge>
        </div>
  
        {/* Weeks */}
  
        <div className="space-y-6">
          {roadmap.weeks.map((week) => (
            <Card key={week.week}>
              <CardHeader>
                <CardTitle>
                  Week {week.week}: {week.title}
                </CardTitle>
  
                <p className="text-sm text-muted-foreground">
                  {week.goal}
                </p>
              </CardHeader>
  
              <CardContent>
                <div className="space-y-4">
                  {week.tasks.map((task, index) => (
                    <div
                      key={index}
                      className="rounded-lg border p-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">
                          {task.title}
                        </h4>
  
                        <Badge variant="secondary">
                          {task.category}
                        </Badge>
                      </div>
  
                      <p className="mt-2 text-sm text-muted-foreground">
                        {task.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }