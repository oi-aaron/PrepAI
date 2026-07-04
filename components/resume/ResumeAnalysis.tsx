import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResumeAnalysis as ResumeAnalysisType } from "@/lib/types/resume";

interface ResumeAnalysisProps {
  analysis: ResumeAnalysisType;
}

export default function ResumeAnalysis({
  analysis,
}: ResumeAnalysisProps) {
  return (
    <div className="space-y-6">
      {/* ATS Score */}
      <Card>
        <CardHeader>
          <CardTitle>ATS Score</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-5xl font-bold text-blue-600">
            {analysis.atsScore}/100
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="leading-7 text-muted-foreground">
            {analysis.summary}
          </p>
        </CardContent>
      </Card>

      {/* Strengths & Weaknesses */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Strengths</CardTitle>
          </CardHeader>

          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              {analysis.strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weaknesses</CardTitle>
          </CardHeader>

          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              {analysis.weaknesses.map((weakness) => (
                <li key={weakness}>{weakness}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Missing Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Missing Skills</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-wrap gap-2">
          {analysis.missingSkills.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </CardContent>
      </Card>

      {/* Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Suggestions</CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="list-disc space-y-2 pl-5">
            {analysis.suggestions.map((suggestion) => (
              <li key={suggestion}>{suggestion}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}