-- AlterTable
ALTER TABLE "user" ADD COLUMN     "selectedCompanyId" TEXT;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_selectedCompanyId_fkey" FOREIGN KEY ("selectedCompanyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
