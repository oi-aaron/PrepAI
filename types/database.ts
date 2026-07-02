import type {
  Company,
  InterviewSession,
  Resume,
  Roadmap,
  User,
} from "@prisma/client";

export type {
  Company,
  InterviewSession,
  InterviewSessionStatus,
  InterviewType,
  Resume,
  Roadmap,
  RoadmapStatus,
  User,
} from "@prisma/client";

export type UserWithRelations = User & {
  resumes: Resume[];
  roadmaps: Roadmap[];
  interviewSessions: InterviewSession[];
};

export type RoadmapWithCompany = Roadmap & {
  company: Company | null;
};

export type InterviewSessionWithCompany = InterviewSession & {
  company: Company | null;
};
