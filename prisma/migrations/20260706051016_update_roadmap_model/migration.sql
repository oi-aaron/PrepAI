/*
  Warnings:

  - Added the required column `content` to the `roadmap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "roadmap" ADD COLUMN     "content" JSONB NOT NULL;
