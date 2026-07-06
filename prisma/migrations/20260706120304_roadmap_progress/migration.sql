-- AlterTable
ALTER TABLE "roadmap" ADD COLUMN     "completedTasks" JSONB NOT NULL DEFAULT '[]';
