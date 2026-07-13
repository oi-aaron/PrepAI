"use client";

import { Company } from "@prisma/client";
import { useState } from "react";

import StartInterviewButton from "./StartInterviewButton";
import RecentInterviews from "./RecentInterviews";

import {
  InterviewDifficulty,
  InterviewSessionStatus,
  InterviewType,
} from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  companies: Company[];

  resumeReady: boolean;

  recentInterviews: {
    id: string;
    title: string;
    type: InterviewType;
    difficulty: InterviewDifficulty;
    status: InterviewSessionStatus;
    score: number | null;
    createdAt: Date;
    company: {
      name: string;
    } | null;
  }[];
}

export default function InterviewSetup({
  companies,
  resumeReady,
  recentInterviews,
}: Props) {
  const [companyId, setCompanyId] = useState(
    companies[0]?.id ?? ""
  );

  const [type, setType] = useState<
    "TECHNICAL" | "BEHAVIORAL" | "SYSTEM_DESIGN" | "MIXED"
  >("TECHNICAL");

  const [difficulty, setDifficulty] = useState<
    "EASY" | "MEDIUM" | "HARD"
  >("MEDIUM");

  return (
    <div className="space-y-10">
      {/* Company */}
      <div>
        <label className="mb-2 block font-medium">
          Company
        </label>

        <Select
          value={companyId}
          onValueChange={(value) => setCompanyId(value ?? "")}
        >
          <SelectTrigger className="w-full">
            <SelectValue>
              {companies.find((c) => c.id === companyId)?.name}
            </SelectValue>
        </SelectTrigger>

          <SelectContent>
            {companies.map((company) => (
              <SelectItem
                key={company.id}
                value={company.id}
              >
                {company.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Interview Type */}
      <div>
        <label className="mb-2 block font-medium">
          Interview Type
        </label>

        <Select
          value={type}
          onValueChange={(value) =>
            setType(value as typeof type)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="TECHNICAL">
              Technical
            </SelectItem>

            <SelectItem value="BEHAVIORAL">
              Behavioral
            </SelectItem>

            <SelectItem value="SYSTEM_DESIGN">
              System Design
            </SelectItem>

            <SelectItem value="MIXED">
              Mixed
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Difficulty */}
      <div>
        <label className="mb-2 block font-medium">
          Difficulty
        </label>

        <Select
          value={difficulty}
          onValueChange={(value) =>
            setDifficulty(
              value as typeof difficulty
            )
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="EASY">
              Easy
            </SelectItem>

            <SelectItem value="MEDIUM">
              Medium
            </SelectItem>

            <SelectItem value="HARD">
              Hard
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <StartInterviewButton
        companyId={companyId}
        type={type}
        difficulty={difficulty}
        resumeReady={resumeReady}
      />

      <RecentInterviews
        interviews={recentInterviews}
      />
    </div>
  );
}