import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  import { Badge } from "@/components/ui/badge";
  
  import { InterviewSessionWithContent } from "@/lib/types/interview";
  
  interface Props {
    interview: InterviewSessionWithContent;
  }
  
  export default function InterviewReport({
    interview,
  }: Props) {
    const feedback = interview.feedback;
  
    if (!feedback) {
      return (
        <div className="rounded-lg border p-8 text-center">
          <h2 className="text-xl font-semibold">
            Evaluation Pending
          </h2>
  
          <p className="mt-2 text-muted-foreground">
            Your interview has not been evaluated yet.
          </p>
        </div>
      );
    }
  
    return (
      <div className="space-y-8">
        {/* Overall Score */}
  
        <Card>
          <CardHeader>
            <CardTitle>
              Overall Score
            </CardTitle>
          </CardHeader>
  
          <CardContent>
            <div className="text-5xl font-bold">
              {feedback.overallScore}
              <span className="text-2xl text-muted-foreground">
                /100
              </span>
            </div>
          </CardContent>
        </Card>
  
        {/* Category Scores */}
  
        <div className="grid gap-4 md:grid-cols-3">
          <ScoreCard
            title="Technical"
            score={feedback.technicalKnowledge}
          />
  
          <ScoreCard
            title="Communication"
            score={feedback.communication}
          />
  
          <ScoreCard
            title="Problem Solving"
            score={feedback.problemSolving}
          />
        </div>
  
        {/* Strengths */}
  
        <Card>
          <CardHeader>
            <CardTitle>Strengths</CardTitle>
          </CardHeader>
  
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {feedback.strengths.map((item) => (
                <Badge key={item}>
                  {item}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
  
        {/* Weaknesses */}
  
        <Card>
          <CardHeader>
            <CardTitle>Areas to Improve</CardTitle>
          </CardHeader>
  
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {feedback.weaknesses.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
  
        {/* Suggestions */}
  
        <Card>
          <CardHeader>
            <CardTitle>
              AI Suggestions
            </CardTitle>
          </CardHeader>
  
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              {feedback.suggestions.map(
                (item) => (
                  <li key={item}>
                    {item}
                  </li>
                )
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  interface ScoreCardProps {
    title: string;
    score: number;
  }
  
  function ScoreCard({
    title,
    score,
  }: ScoreCardProps) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {title}
          </CardTitle>
        </CardHeader>
  
        <CardContent>
          <div className="text-3xl font-bold">
            {score}
          </div>
  
          <div className="mt-3 h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary"
              style={{
                width: `${score}%`,
              }}
            />
          </div>
        </CardContent>
      </Card>
    );
  }