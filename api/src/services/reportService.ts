import mongoose, { Types } from "mongoose";
import Report, { IReport } from "../models/Report";
import sleepSessionService from "./sleepSessionService";
import dailyMoodService from "./dailyMoodService";

interface ReportData {
  userId: Types.ObjectId;
  sleepDurations: number[];
  sleepQualities: number[];
  energyLevels: number[];
}

class ReportService {
  private calculateAverage(values: number[]): number {
    const total = values.reduce((sum, value) => sum + value, 0);
    return values.length ? total / values.length : 0;
  }

  async generateDynamicReport(userId: Types.ObjectId) {
    const sleepSessions = await sleepSessionService.getSessionsForUser(userId);
    const dailyMoods = await dailyMoodService.getMoodsForUser(userId);

    const past7Days = new Date();
    past7Days.setDate(past7Days.getDate() - 7);

    const past30Days = new Date();
    past30Days.setDate(past30Days.getDate() - 30);

    const weeklySleepDurations = sleepSessions
      .filter((session: any) => session.date >= past7Days)
      .map((session: any) => session.duration);

    const monthlySleepDurations = sleepSessions
      .filter((session: any) => session.date >= past30Days)
      .map((session: any) => session.duration);

    const weeklyEnergyLevels = dailyMoods
      .filter((mood: any) => mood.date >= past7Days)
      .map((mood: any) => mood.energyLevel);

    const monthlyEnergyLevels = dailyMoods
      .filter((mood: any) => mood.date >= past30Days)
      .map((mood: any) => mood.energyLevel);

    return {
      weeklySleepAverage: this.calculateAverage(weeklySleepDurations),
      monthlySleepAverage: this.calculateAverage(monthlySleepDurations),
      weeklyEnergyLevel: this.calculateAverage(weeklyEnergyLevels),
      monthlyEnergyLevel: this.calculateAverage(monthlyEnergyLevels)
    };
  }

  async createReport(data: ReportData): Promise<IReport> {
    const { userId, sleepDurations = [], sleepQualities = [], energyLevels = [] } = data;

    const sleepStats = await sleepSessionService.calculateSleepStats(userId);

    const weeklySleepAverage = parseFloat(this.calculateAverage(sleepDurations.slice(-7)).toFixed(2));
    const monthlySleepAverage = parseFloat(this.calculateAverage(sleepDurations).toFixed(2));
    const weeklySleepQuality = parseFloat(this.calculateAverage(sleepQualities.slice(-7)).toFixed(2));
    const monthlySleepQuality = parseFloat(this.calculateAverage(sleepQualities).toFixed(2));
    const weeklyEnergyLevel = parseFloat(this.calculateAverage(energyLevels.slice(-7)).toFixed(2));
    const monthlyEnergyLevel = parseFloat(this.calculateAverage(energyLevels).toFixed(2));

    const weeklySleepLatency = parseFloat(sleepStats.weeklyAverageLatency.toFixed(2));
    const monthlySleepLatency = parseFloat(sleepStats.monthlyAverageLatency.toFixed(2));

    const report = new Report({
      userId,
      weeklySleepAverage,
      monthlySleepAverage,
      weeklySleepQuality,
      monthlySleepQuality,
      weeklyEnergyLevel,
      monthlyEnergyLevel,
      weeklySleepLatency,
      monthlySleepLatency,
    });

    return report.save();
  }

  async getOne(id: string): Promise<IReport> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format.");
    }

    try {
      const report = await Report.findById(id);
      if (!report) throw new Error("Report not found.");
      return report;
    } catch (error) {
      console.error("Error fetching a specific report:", error);
      throw new Error("Error fetching a specific report.");
    }
  }

  async deleteReport(reportId: Types.ObjectId): Promise<IReport | null> {
    return Report.findByIdAndDelete(reportId).exec();
  }
}

export default new ReportService();
