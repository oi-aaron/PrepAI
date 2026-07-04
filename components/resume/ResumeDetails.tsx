import { Resume } from "@prisma/client";
import { Button } from "@/components/ui/button";
import AnalyzeResumeButton from "./AnalyzeResumeButton";

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

      {/* Extracted Resume Text */}
      {resume.extractedText && (
        <div className="rounded-lg border bg-muted/50 p-4">
          <h4 className="mb-3 font-semibold">
            Extracted Resume Text
          </h4>

          <pre className="whitespace-pre-wrap break-words text-sm font-sans">
            {resume.extractedText}
          </pre>
        </div>
      )}
    </div>
  );
}