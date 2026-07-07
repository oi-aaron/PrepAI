import { InterviewSession, Company } from "@prisma/client";

export interface InterviewQuestion {
  question: string;
  expectedTopics: string[];
}

export interface InterviewContent {
  company: string;
  role: string;
  type: string;
  difficulty: string;
  questions: InterviewQuestion[];
}

export interface InterviewAnswer {
  questionIndex: number;
  answer: string;
}

export interface InterviewFeedback {
  overallScore: number;
  technicalKnowledge: number;
  communication: number;
  problemSolving: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export interface InterviewSessionWithContent
  extends Omit<
    InterviewSession,
    "questions" | "answers" | "feedback"
  > {
  company: Company | null;

  questions: InterviewContent | null;

  answers: InterviewAnswer[];

  feedback: InterviewFeedback | null;
}