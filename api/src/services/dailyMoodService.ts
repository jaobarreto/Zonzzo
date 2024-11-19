import mongoose, { Types } from "mongoose";
import DailyMood, { IDailyMood } from "../models/DailyMood";

interface DailyMoodData {
  userId: Types.ObjectId;
  date: Date;
  mood: number;
  energyLevel: number;
}

class DailyMoodService {
  async createMood(data: DailyMoodData): Promise<IDailyMood> {
    const { userId, date, mood, energyLevel } = data;

    const dailyMood = new DailyMood({
      userId,
      date,
      mood,
      energyLevel,
    });

    return dailyMood.save();
  }

  async getMoodsForUser(userId: Types.ObjectId): Promise<IDailyMood[]> {
    return DailyMood.find({ userId }).sort({ date: -1 }).exec();
  }

  async updateMood(
    moodId: Types.ObjectId,
    data: Partial<DailyMoodData>
  ): Promise<IDailyMood | null> {
    return DailyMood.findByIdAndUpdate(moodId, data, { new: true }).exec();
  }

  async deleteMood(moodId: Types.ObjectId): Promise<IDailyMood | null> {
    return DailyMood.findByIdAndDelete(moodId).exec();
  }

  async calculateMoodStats(userId: Types.ObjectId): Promise<{
    weeklyAverageMood: number;
    weeklyAverageEnergy: number;
    monthlyAverageMood: number;
    monthlyAverageEnergy: number;
  }> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

    const weeklyMoods = await DailyMood.find({
      userId,
      date: { $gte: oneWeekAgo },
    }).exec();

    const monthlyMoods = await DailyMood.find({
      userId,
      date: { $gte: oneMonthAgo },
    }).exec();

    const weeklyAverageMood = this.calculateAverage(
      weeklyMoods.map((mood) => Number(mood.mood))
    );
    const weeklyAverageEnergy = this.calculateAverage(
      weeklyMoods.map((mood) => Number(mood.energyLevel))
    );
    const monthlyAverageMood = this.calculateAverage(
      monthlyMoods.map((mood) => Number(mood.mood))
    );
    const monthlyAverageEnergy = this.calculateAverage(
      monthlyMoods.map((mood) => Number(mood.energyLevel))
    );

    return {
      weeklyAverageMood,
      weeklyAverageEnergy,
      monthlyAverageMood,
      monthlyAverageEnergy,
    };
  }

  private calculateAverage(values: number[]): number {
    const total = values.reduce((sum, value) => sum + value, 0);
    return values.length ? total / values.length : 0;
  }
}

export default new DailyMoodService();
