"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth/server";

import { generateInterviewQuestions } from "@/lib/ai/interview";

export async function startInterviewAction(
  companyId: string,
  type:
    | "TECHNICAL"
    | "BEHAVIORAL"
    | "SYSTEM_DESIGN"
    | "MIXED",
  difficulty:
    | "EASY"
    | "MEDIUM"
    | "HARD"
) {
  const session = await getServerSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Get company
  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
  });

  if (!company) {
    throw new Error("Company not found.");
  }

  // Get user's analyzed resume
  const resume = await prisma.resume.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!resume) {
    throw new Error("Please upload your resume first.");
  }

  if (!resume.extractedText) {
    throw new Error(
      "Please analyze your resume before starting an interview."
    );
  }

  // Generate interview questions with Gemini
  const interviewContent = await generateInterviewQuestions(
    company.name,
    "Software Engineer",
    type,
    difficulty,
    resume.extractedText
  );

  // Create interview session
  const interview = await prisma.interviewSession.create({
    data: {
      userId: session.user.id,
      companyId: company.id,

      title: `${company.name} ${type} Interview`,

      type,
      difficulty,

      status: "SCHEDULED",

      questions: interviewContent,
    },
  });

  return interview.id;
}