import mongoose, { Types } from "mongoose";
import Report, { IReport } from "../models/Report";

interface ReportData {
  userId: Types.ObjectId;
  sleepDurations: number[];
  sleepQualities: number[];
}

class ReportService {
  private calculateAverage(values: number[]): number {
    const total = values.reduce((sum, value) => sum + value, 0);
    return values.length ? total / values.length : 0;
  }

  async createReport(data: ReportData): Promise<IReport> {
    const { userId, sleepDurations, sleepQualities } = data;

    const weeklySleepAverage = parseFloat(this.calculateAverage(sleepDurations.slice(-7)).toFixed(2));
    const monthlySleepAverage = parseFloat(this.calculateAverage(sleepDurations).toFixed(2));
    const weeklySleepQuality = parseFloat(this.calculateAverage(sleepQualities.slice(-7)).toFixed(2));
    const monthlySleepQuality = parseFloat(this.calculateAverage(sleepQualities).toFixed(2));

    const report = new Report({
      userId,
      weeklySleepAverage,
      monthlySleepAverage,
      weeklySleepQuality,
      monthlySleepQuality,
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

  async updateReport(
    reportId: Types.ObjectId,
    data: ReportData
  ): Promise<IReport | null> {
    const { sleepDurations, sleepQualities } = data;

    const weeklySleepAverage = parseFloat(this.calculateAverage(sleepDurations.slice(-7)).toFixed(2));
    const monthlySleepAverage = parseFloat(this.calculateAverage(sleepDurations).toFixed(2));
    const weeklySleepQuality = parseFloat(this.calculateAverage(sleepQualities.slice(-7)).toFixed(2));
    const monthlySleepQuality = parseFloat(this.calculateAverage(sleepQualities).toFixed(2));

    return Report.findByIdAndUpdate(
      reportId,
      {
        weeklySleepAverage,
        monthlySleepAverage,
        weeklySleepQuality,
        monthlySleepQuality,
      },
      { new: true }
    ).exec();
  }

  async deleteReport(reportId: Types.ObjectId): Promise<IReport | null> {
    return Report.findByIdAndDelete(reportId).exec();
  }
}

export default new ReportService();
