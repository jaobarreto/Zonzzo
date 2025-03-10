-- CreateEnum
CREATE TYPE "Mood" AS ENUM ('DISPOSTO', 'NORMAL', 'EXAUSTO');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('SEMANAL', 'MENSAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleepPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "wakeupFlexMinutes" INTEGER NOT NULL,
    "wakeSound" TEXT NOT NULL,
    "sleepSound" TEXT NOT NULL,
    "wakeSoundVolume" INTEGER NOT NULL,
    "sleepSoundVolume" INTEGER NOT NULL,

    CONSTRAINT "SleepPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleepGoal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "daysOfWeek" INTEGER[],
    "sleepTime" TIMESTAMP(3) NOT NULL,
    "wakeTime" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "SleepGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleepSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sleepDate" TIMESTAMP(3) NOT NULL,
    "minutesSlept" INTEGER NOT NULL,
    "minutesInBed" INTEGER NOT NULL,
    "sleepLatency" INTEGER NOT NULL,
    "awakenings" INTEGER NOT NULL,
    "sleepStartTime" TIMESTAMP(3) NOT NULL,
    "sleepEndTime" TIMESTAMP(3) NOT NULL,
    "dailyNotes" TEXT,

    CONSTRAINT "SleepSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WakeSession" (
    "id" TEXT NOT NULL,
    "sleepSessionId" TEXT NOT NULL,
    "wakeDate" TIMESTAMP(3) NOT NULL,
    "wakeTime" TIMESTAMP(3) NOT NULL,
    "dreamNotes" TEXT,

    CONSTRAINT "WakeSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleepFeedback" (
    "id" TEXT NOT NULL,
    "wakeSessionId" TEXT NOT NULL,
    "mood" TEXT NOT NULL,

    CONSTRAINT "SleepFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleepReport" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "daysUsed" INTEGER NOT NULL,
    "avgSleepHours" DOUBLE PRECISION NOT NULL,
    "avgSleepLatency" DOUBLE PRECISION NOT NULL,
    "avgSleepQuality" DOUBLE PRECISION NOT NULL,
    "daysFeelingGood" INTEGER NOT NULL,
    "daysFeelingNormal" INTEGER NOT NULL,
    "daysFeelingExhausted" INTEGER NOT NULL,
    "daysWithoutSleep" INTEGER NOT NULL,

    CONSTRAINT "SleepReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SleepPreference_userId_key" ON "SleepPreference"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WakeSession_sleepSessionId_key" ON "WakeSession"("sleepSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "SleepFeedback_wakeSessionId_key" ON "SleepFeedback"("wakeSessionId");

-- AddForeignKey
ALTER TABLE "SleepPreference" ADD CONSTRAINT "SleepPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepGoal" ADD CONSTRAINT "SleepGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepSession" ADD CONSTRAINT "SleepSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WakeSession" ADD CONSTRAINT "WakeSession_sleepSessionId_fkey" FOREIGN KEY ("sleepSessionId") REFERENCES "SleepSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepFeedback" ADD CONSTRAINT "SleepFeedback_wakeSessionId_fkey" FOREIGN KEY ("wakeSessionId") REFERENCES "WakeSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepReport" ADD CONSTRAINT "SleepReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
