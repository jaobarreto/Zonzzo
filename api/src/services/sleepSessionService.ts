import SleepSession, { ISleepSession } from "../models/SleepSession";

export class SleepSessionService {
  public async createSession(sessionData: {
    userId: string;
    sleepStart: string;
    sleepEnd: string;
    sleepLatency: number;
    awakenings: number;
    notes?: string;
  }): Promise<ISleepSession> {
    const { sleepStart, sleepEnd } = sessionData;
    const start = new Date(sleepStart);
    const end = new Date(sleepEnd);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid sleep start or end date");
    }

    if (start >= end) {
      throw new Error("Sleep start must be before sleep end");
    }

    const totalSleep = this.calculateTotalSleep(start, end);
    const totalBedTime = this.calculateTotalBedTime(start, end);

    const session = new SleepSession({
      ...sessionData,
      sleepStart: start,
      sleepEnd: end,
      totalSleep,
      totalBedTime,
      date: start,
    });

    return await session.save();
  }

  public async getSessionsByUser(userId: string): Promise<ISleepSession[]> {
    return await SleepSession.find({ userId }).sort({ date: -1 }).exec();
  }

  public async getSessionById(sessionId: string): Promise<ISleepSession | null> {
    return await SleepSession.findById(sessionId).exec();
  }

  public async updateSession(
    sessionId: string,
    updateData: Partial<ISleepSession>
  ): Promise<ISleepSession | null> {
    const session = await SleepSession.findById(sessionId);
    if (!session) {
      throw new Error("Session not found");
    }

    if (updateData.sleepStart && updateData.sleepEnd) {
      const sleepStart = new Date(updateData.sleepStart);
      const sleepEnd = new Date(updateData.sleepEnd);

      if (isNaN(sleepStart.getTime()) || isNaN(sleepEnd.getTime())) {
        throw new Error("Invalid sleep start or end date");
      }

      if (sleepStart >= sleepEnd) {
        throw new Error("Sleep start must be before sleep end");
      }

      updateData.totalSleep = this.calculateTotalSleep(sleepStart, sleepEnd);
      updateData.totalBedTime = this.calculateTotalBedTime(sleepStart, sleepEnd);
    }

    Object.assign(session, updateData);
    return await session.save();
  }

  public async deleteSession(sessionId: string): Promise<void> {
    const session = await SleepSession.findById(sessionId);
    if (!session) {
      throw new Error("Session not found");
    }
    await session.deleteOne();
  }

  private calculateTotalSleep(sleepStart: Date, sleepEnd: Date): number {
    return (sleepEnd.getTime() - sleepStart.getTime()) / (1000 * 60);
  }

  private calculateTotalBedTime(sleepStart: Date, sleepEnd: Date): number {
    return this.calculateTotalSleep(sleepStart, sleepEnd);
  }

  public async getSummaryByUser(userId: string): Promise<{
    totalSessions: number;
    totalSleepMinutes: number;
    averageSleepHours: number;
    averageSleepLatency: number;
  }> {
    const sessions = await this.getSessionsByUser(userId);

    const totalSessions = sessions.length;
    const totalSleepMinutes = sessions.reduce(
      (sum, session) => sum + (session.totalSleep || 0),
      0
    );
    const totalLatency = sessions.reduce(
      (sum, session) => sum + (session.sleepLatency || 0),
      0
    );

    const averageSleepHours = totalSessions
      ? totalSleepMinutes / totalSessions / 60
      : 0;

    const averageSleepLatency = totalSessions
      ? totalLatency / totalSessions
      : 0;

    return {
      totalSessions,
      totalSleepMinutes,
      averageSleepHours,
      averageSleepLatency,
    };
  }
}

export default new SleepSessionService();
