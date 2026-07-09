"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth/server";
import {
  InterviewAnswer,
  InterviewContent,
  InterviewFeedback,
  InterviewSessionWithContent,
} from "@/lib/types/interview";
import { Prisma } from "@prisma/client";

export async function getInterviewSession(
  interviewId: string
): Promise<InterviewSessionWithContent> {
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

  return {
    ...interview,
    questions:
      (interview.questions as unknown as InterviewContent) ?? null,
    answers:
      (interview.answers as unknown as InterviewAnswer[]) ?? [],
    feedback:
      (interview.feedback as unknown as InterviewFeedback) ?? null,
  };
}

export async function saveAnswerAction(
  interviewId: string,
  questionIndex: number,
  answer: string
) {
  const session = await getServerSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const interview = await prisma.interviewSession.findUnique({
    where: {
      id: interviewId,
    },
  });

  if (!interview) {
    throw new Error("Interview not found.");
  }

  if (interview.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  const answers =
    (interview.answers as unknown as InterviewAnswer[]) ?? [];

  const existingAnswer = answers.find(
    (item) => item.questionIndex === questionIndex
  );

  if (existingAnswer) {
    existingAnswer.answer = answer;
  } else {
    answers.push({
      questionIndex,
      answer,
    });
  }

  await prisma.interviewSession.update({
    where: {
      id: interviewId,
    },
    data: {
      answers: answers as unknown as Prisma.InputJsonValue,
    },
  });

  return {
    success: true,
  };
}