"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function ResumeUploader() {
  const router = useRouter();

  return (
    <UploadDropzone
  endpoint="resumeUploader"
  appearance={{
    container:
      "border-2 border-dashed border-gray-700 rounded-xl p-6 max-w-md mx-auto",
    uploadIcon: "w-8 h-8 text-blue-500",
    label: "text-sm font-medium",
    allowedContent: "text-xs text-muted-foreground",
    button:
      "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg",
  }}
  onClientUploadComplete={() => {
    toast.success("Resume uploaded!");
    router.refresh();
  }}
  onUploadError={(error) => {
    toast.error(error.message);
  }}
/>
  );
}