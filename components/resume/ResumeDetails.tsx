import { Resume } from "@prisma/client";
import { Button } from "@/components/ui/button";
import AnalyzeResumeButton from "./AnalyzeResumeButton";
import ResumeAnalysis from "./ResumeAnalysis";
import { ResumeAnalysis as ResumeAnalysisType } from "@/lib/types/resume";

interface Props {
  resume: Resume | null;
}

export default function ResumeDetails({ resume }: Props) {
  if (!resume) {
    return (
      <div className="rounded-lg border p-6 text-center">
        <p className="text-muted-foreground">
          You haven't uploaded a resume yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-lg border p-6">
      {/* Resume Information */}
      <div>
        <h3 className="text-lg font-semibold">{resume.fileName}</h3>

        <p className="text-sm text-muted-foreground">
          Uploaded on{" "}
          {new Date(resume.createdAt).toLocaleDateString("en-IN")}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        <a
          href={resume.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>
            View Resume
          </Button>
        </a>

        <AnalyzeResumeButton />
      </div>

      {resume.analysis && (
  <ResumeAnalysis
    analysis={resume.analysis as ResumeAnalysisType}
  />
)}
    </div>
  );
}