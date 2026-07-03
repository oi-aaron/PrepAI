import { Resume } from "@prisma/client";
import { Button } from "@/components/ui/button";

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
    <div className="rounded-lg border p-6 space-y-4">
      <div>
        <h3 className="font-semibold">
          {resume.fileName}
        </h3>

        <p className="text-sm text-muted-foreground">
  Uploaded on{" "}
  {new Date(resume.createdAt).toLocaleDateString("en-IN")}
</p>
      </div>

      <a
  href={resume.fileUrl}
  target="_blank"
  rel="noopener noreferrer"
>
  <Button>
    View Resume
  </Button>
</a>
    </div>
  );
}