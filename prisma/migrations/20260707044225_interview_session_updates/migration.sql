-- CreateEnum
CREATE TYPE "InterviewDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "interview_session" ADD COLUMN     "answers" JSONB,
ADD COLUMN     "difficulty" "InterviewDifficulty" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "feedback" JSONB,
ADD COLUMN     "questions" JSONB,
ALTER COLUMN "type" DROP DEFAULT;
