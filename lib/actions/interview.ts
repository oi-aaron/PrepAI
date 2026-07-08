"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth/server";
import { evaluateInterview } from "@/lib/ai/evaluation";
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
    throw new Error(
      "Please upload your resume before starting an interview."
    );
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

export async function evaluateInterviewAction(
  interviewId: string
) {
  const session = await getServerSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const interview = await prisma.interviewSession.findUnique({
    where: {
      id: interviewId,
    },
    include: {
      company: true,
    },
  });

  if (!interview) {
    throw new Error("Interview not found.");
  }

  if (interview.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  const resume = await prisma.resume.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!resume?.extractedText) {
    throw new Error(
      "Resume analysis is required before evaluation."
    );
  }

  if (!interview.questions) {
    throw new Error("Interview questions not found.");
  }

  if (!interview.answers) {
    throw new Error("No interview answers found.");
  }

  const feedback = await evaluateInterview(
    interview.questions,
    interview.answers,
    resume.extractedText,
    interview.company?.name ?? "Unknown Company",
    "Software Engineer",
    interview.type,
    interview.difficulty
  );

  await prisma.interviewSession.update({
    where: {
      id: interview.id,
    },
    data: {
      feedback,
      score:
        typeof feedback.overallScore === "number"
          ? feedback.overallScore
          : null,
      status: "COMPLETED",
      completedAt: new Date(),
    },
  });

  return {
    success: true,
  };
}