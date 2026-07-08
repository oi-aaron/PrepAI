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

        <select
          className="w-full rounded-md border p-2"
          value={companyId}
          onChange={(e) =>
            setCompanyId(e.target.value)
          }
        >
          {companies.map((company) => (
            <option
              key={company.id}
              value={company.id}
            >
              {company.name}
            </option>
          ))}
        </select>
      </div>

      {/* Interview Type */}
      <div>
        <label className="mb-2 block font-medium">
          Interview Type
        </label>

        <select
          className="w-full rounded-md border p-2"
          value={type}
          onChange={(e) =>
            setType(e.target.value as typeof type)
          }
        >
          <option value="TECHNICAL">
            Technical
          </option>

          <option value="BEHAVIORAL">
            Behavioral
          </option>

          <option value="SYSTEM_DESIGN">
            System Design
          </option>

          <option value="MIXED">
            Mixed
          </option>
        </select>
      </div>

      {/* Difficulty */}
      <div>
        <label className="mb-2 block font-medium">
          Difficulty
        </label>

        <select
          className="w-full rounded-md border p-2"
          value={difficulty}
          onChange={(e) =>
            setDifficulty(
              e.target.value as typeof difficulty
            )
          }
        >
          <option value="EASY">
            Easy
          </option>

          <option value="MEDIUM">
            Medium
          </option>

          <option value="HARD">
            Hard
          </option>
        </select>
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