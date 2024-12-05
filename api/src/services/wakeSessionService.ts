import mongoose, { Types } from "mongoose";
import WakeSession, { IWakeSession } from "../models/WakeSession";

interface WakeSessionData {
  userId: Types.ObjectId;
  date: Date;
  mood: string;
  dreamNotes?: string;
}

class WakeSessionService {
  async createWakeSession(data: WakeSessionData): Promise<IWakeSession> {
    const { userId, date, mood, dreamNotes } = data;

    const wakeSession = new WakeSession({
      userId,
      date,
      mood,
      dreamNotes,
    });

    return wakeSession.save();
  }

  async getWakeSessionsForUser(userId: Types.ObjectId): Promise<IWakeSession[]> {
    return WakeSession.find({ userId }).sort({ date: -1 }).exec();
  }

  async updateWakeSession(
    sessionId: Types.ObjectId,
    data: Partial<WakeSessionData>
  ): Promise<IWakeSession | null> {
    return WakeSession.findByIdAndUpdate(sessionId, data, { new: true }).exec();
  }

  async deleteWakeSession(sessionId: Types.ObjectId): Promise<IWakeSession | null> {
    return WakeSession.findByIdAndDelete(sessionId).exec();
  }

  async calculateMoodStats(userId: Types.ObjectId): Promise<{
    weeklyMoodDistribution: Record<string, number>;
    monthlyMoodDistribution: Record<string, number>;
  }> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

    const weeklySessions = await WakeSession.find({
      userId,
      date: { $gte: oneWeekAgo },
    }).exec();

    const monthlySessions = await WakeSession.find({
      userId,
      date: { $gte: oneMonthAgo },
    }).exec();

    return {
      weeklyMoodDistribution: this.calculateMoodDistribution(weeklySessions),
      monthlyMoodDistribution: this.calculateMoodDistribution(monthlySessions),
    };
  }

  private calculateMoodDistribution(sessions: IWakeSession[]): Record<string, number> {
    const distribution: Record<string, number> = {};
    sessions.forEach((session) => {
      const mood = session.mood;
      distribution[mood] = (distribution[mood] || 0) + 1;
    });
    return distribution;
  }
}

export default new WakeSessionService();
