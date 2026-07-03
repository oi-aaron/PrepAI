/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `resume` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fileKey]` on the table `resume` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fileKey` to the `resume` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "resume_userId_idx";

-- AlterTable
ALTER TABLE "resume" ADD COLUMN     "analysis" JSONB,
ADD COLUMN     "extractedText" TEXT,
ADD COLUMN     "fileKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "resume_userId_key" ON "resume"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "resume_fileKey_key" ON "resume"("fileKey");
