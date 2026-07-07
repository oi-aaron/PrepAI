"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth/server";
import { InterviewSessionWithContent } from "@/lib/types/interview";

export async function getInterviewSession(
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

  return interview as InterviewSessionWithContent;
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
    (interview.answers as
      | {
          questionIndex: number;
          answer: string;
        }[]
      | null) ?? [];

  const existingIndex = answers.findIndex(
    (item) => item.questionIndex === questionIndex
  );

  if (existingIndex >= 0) {
    answers[existingIndex].answer = answer;
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
      answers,
    },
  });

  return {
    success: true,
  };
}