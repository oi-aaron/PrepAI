import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  import { Badge } from "@/components/ui/badge";
  
  import { RoadmapContent } from "@/lib/types/roadmap";
  import RoadmapTask from "./RoadmapTask";
  
  interface Props {
    roadmapId: string;
    roadmap: RoadmapContent;
    completedTasks: string[];
    progress: number;
  }
  
  export default function RoadmapView({
    roadmapId,
    roadmap,
    completedTasks,
    progress,
  }: Props) {
    const totalTasks = roadmap.weeks.reduce(
      (total, week) => total + week.tasks.length,
      0
    );
  
    const completedCount = completedTasks.length;
  
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
  
          {/* Progress */}
  
          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    Overall Progress
                  </h3>
  
                  <span className="text-sm text-muted-foreground">
                    {progress}%
                  </span>
                </div>
  
                <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
  
                <p className="text-sm text-muted-foreground">
                  {completedCount} / {totalTasks} tasks completed
                </p>
              </div>
            </CardContent>
          </Card>
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
                  {week.tasks.map((task, index) => {
                    const taskId = `week${week.week}-task${index}`;
  
                    return (
                      <RoadmapTask
                        key={taskId}
                        roadmapId={roadmapId}
                        taskId={taskId}
                        title={task.title}
                        description={task.description}
                        category={task.category}
                        completed={completedTasks.includes(taskId)}
                      />
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }