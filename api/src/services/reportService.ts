import Report, { IReport } from "../models/Report";
import SleepSession, { ISleepSession } from "../models/SleepSession";
import WakeSession, { IWakeSession } from "../models/WakeSession";

class ReportService {
  private roundToTwoDecimals(value: number): number {
    return Math.round(value * 100) / 100;
  }

  private calculateHoursAndMinutes(totalMinutes: number): { hours: number; minutes: number } {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  }

  private calculateAverage(values: number[]): number {
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, val) => acc + val, 0);
    return this.roundToTwoDecimals(sum / values.length);
  }

  private calculateSleepQuality(totalSleep: number, totalBedTime: number): number {
    if (totalBedTime === 0) return 0;
    return this.roundToTwoDecimals((totalSleep / totalBedTime) * 100);
  }

  private async getCombinedSessions(userId: string, startDate: Date, endDate: Date) {
    const sleepSessions = await SleepSession.find({
      userId,
      sleepStart: { $gte: startDate, $lte: endDate },
    });

    const wakeSessions = await WakeSession.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    });

    return { sleepSessions, wakeSessions };
  }

  public async generateReport(userId: string, type: 'weekly' | 'monthly'): Promise<IReport> {
    const startDate = type === 'weekly' ? this.getStartOfWeek() : this.getStartOfMonth();
    const endDate = new Date();

    const { sleepSessions, wakeSessions } = await this.getCombinedSessions(userId, startDate, endDate);

    const daysUsed = new Set(
      sleepSessions.map(session => session.sleepStart.toISOString().split('T')[0])
    ).size;

    const averageSleepDurationMinutes = this.calculateAverage(
      sleepSessions.map(session => session.totalSleep)
    );
    const averageSleepLatencyMinutes = this.calculateAverage(
      sleepSessions.map(session => session.sleepLatency)
    );
    const averageSleepQuality = this.calculateAverage(
      sleepSessions.map(session =>
        this.calculateSleepQuality(session.totalSleep, session.totalBedTime)
      )
    );

    const feedback = this.calculateFeedback(wakeSessions);

    const reportData: Partial<IReport> = {
      userId,
      type,
      month: startDate.getUTCMonth() + 1,
      year: startDate.getUTCFullYear(),
      daysUsed,
      averageSleepDuration: this.calculateHoursAndMinutes(averageSleepDurationMinutes),
      averageSleepLatency: this.calculateHoursAndMinutes(averageSleepLatencyMinutes),
      averageSleepQuality,
      feedbackDisposto: feedback.disposto,
      feedbackNormal: feedback.normal,
      feedbackExausto: feedback.exausto,
    };

    const report = new Report(reportData);
    return await report.save();
  }

  private calculateFeedback(wakeSessions: IWakeSession[]) {
    const feedback = { disposto: 0, normal: 0, exausto: 0 };

    wakeSessions.forEach(session => {
      switch (session.mood) {
        case 'disposto':
          feedback.disposto++;
          break;
        case 'normal':
          feedback.normal++;
          break;
        case 'exausto':
          feedback.exausto++;
          break;
      }
    });

    return feedback;
  }

  private getStartOfWeek(): Date {
    const now = new Date();
    const dayOfWeek = now.getUTCDay();
    const diff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    const startOfWeek = new Date(now);
    startOfWeek.setUTCDate(now.getUTCDate() + diff);
    startOfWeek.setUTCHours(0, 0, 0, 0);
    return startOfWeek;
  }

  private getStartOfMonth(): Date {
    const now = new Date();
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1));
  }
}

export default ReportService;
