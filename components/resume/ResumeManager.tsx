"use client";

import { useState } from "react";
import { Resume } from "@prisma/client";

import ResumeUploader from "./ResumeUploader";
import ResumeDetails from "./ResumeDetails";
import { Button } from "@/components/ui/button";

interface ResumeManagerProps {
  resume: Resume | null;
}

export default function ResumeManager({
  resume,
}: ResumeManagerProps) {
  const [showUploader, setShowUploader] = useState(!resume);

  if (!resume) {
    return <ResumeUploader />;
  }

  return (
    <div className="space-y-6">
      <ResumeDetails resume={resume} />

      {!showUploader ? (
        <Button
          onClick={() => setShowUploader(true)}
          variant="outline"
        >
          Replace Resume
        </Button>
      ) : (
        <div className="space-y-4">
          <ResumeUploader />

          <Button
            variant="ghost"
            onClick={() => setShowUploader(false)}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}