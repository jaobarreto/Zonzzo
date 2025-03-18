/*
  Warnings:

  - Changed the type of `type` on the `SleepReport` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SleepReport" DROP COLUMN "type",
ADD COLUMN     "type" "ReportType" NOT NULL;
