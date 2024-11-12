import mongoose, { Types } from "mongoose";
import SleepSession, { ISleepSession } from "../models/SleepSession";

interface SleepSessionData {
  userId: Types.ObjectId;
  date: Date;
  sleepDuration: number;
  sleepQuality: number;
  sleepLatency: number;
}

class SleepSessionService {
  async createSession(data: SleepSessionData): Promise<ISleepSession> {
    const { userId, date, sleepDuration, sleepQuality, sleepLatency } = data;

    const session = new SleepSession({
      userId,
      date,
      sleepDuration,
      sleepQuality,
      sleepLatency,
    });

    return session.save();
  }

  async getSessionsForUser(userId: Types.ObjectId): Promise<ISleepSession[]> {
    return SleepSession.find({ userId }).sort({ date: -1 }).exec();
  }

  async updateSession(
    sessionId: Types.ObjectId,
    data: Partial<SleepSessionData>
  ): Promise<ISleepSession | null> {
    return SleepSession.findByIdAndUpdate(sessionId, data, { new: true }).exec();
  }

  async deleteSession(sessionId: Types.ObjectId): Promise<ISleepSession | null> {
    return SleepSession.findByIdAndDelete(sessionId).exec();
  }

  async calculateSleepStats(userId: Types.ObjectId): Promise<{
    weeklyAverageDuration: number;
    weeklyAverageQuality: number;
    weeklyAverageLatency: number;
    monthlyAverageDuration: number;
    monthlyAverageQuality: number;
    monthlyAverageLatency: number;
  }> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

    const weeklySessions = await SleepSession.find({
      userId,
      date: { $gte: oneWeekAgo }
    }).exec();

    const monthlySessions = await SleepSession.find({
      userId,
      date: { $gte: oneMonthAgo }
    }).exec();

    const weeklyAverageDuration = this.calculateAverage(
      weeklySessions.map((session) => session.sleepDuration)
    );
    const weeklyAverageQuality = this.calculateAverage(
      weeklySessions.map((session) => session.sleepQuality)
    );
    const weeklyAverageLatency = this.calculateAverage(
      weeklySessions.map((session) => session.sleepLatency)
    );
    const monthlyAverageDuration = this.calculateAverage(
      monthlySessions.map((session) => session.sleepDuration)
    );
    const monthlyAverageQuality = this.calculateAverage(
      monthlySessions.map((session) => session.sleepQuality)
    );
    const monthlyAverageLatency = this.calculateAverage(
      monthlySessions.map((session) => session.sleepLatency)
    );

    return {
      weeklyAverageDuration,
      weeklyAverageQuality,
      weeklyAverageLatency,
      monthlyAverageDuration,
      monthlyAverageQuality,
      monthlyAverageLatency
    };
  }

  private calculateAverage(values: number[]): number {
    const total = values.reduce((sum, value) => sum + value, 0);
    return values.length ? total / values.length : 0;
  }
}


export default new SleepSessionService();
