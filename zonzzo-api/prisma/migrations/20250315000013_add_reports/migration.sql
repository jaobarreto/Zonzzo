/*
  Warnings:

  - You are about to drop the column `avgSleepQuality` on the `SleepReport` table. All the data in the column will be lost.
  - You are about to drop the column `daysFeelingExhausted` on the `SleepReport` table. All the data in the column will be lost.
  - You are about to drop the column `daysFeelingGood` on the `SleepReport` table. All the data in the column will be lost.
  - You are about to drop the column `daysFeelingNormal` on the `SleepReport` table. All the data in the column will be lost.
  - You are about to drop the column `daysWithoutSleep` on the `SleepReport` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `SleepReport` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `SleepReport` table. All the data in the column will be lost.
  - Added the required column `avgSleepEfficiency` to the `SleepReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `SleepReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latencyIndex` to the `SleepReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sleepFragmentation` to the `SleepReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SleepReport" DROP COLUMN "avgSleepQuality",
DROP COLUMN "daysFeelingExhausted",
DROP COLUMN "daysFeelingGood",
DROP COLUMN "daysFeelingNormal",
DROP COLUMN "daysWithoutSleep",
DROP COLUMN "month",
DROP COLUMN "year",
ADD COLUMN     "avgSleepEfficiency" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "latencyIndex" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sleepFragmentation" DOUBLE PRECISION NOT NULL;
