import Report, { IReport } from "../models/Report";
import SleepSession, { ISleepSession } from "../models/SleepSession";

class ReportService {
  private calculateSleepEfficiency(
    totalSleep: number,
    totalBedTime: number
  ): number {
    if (totalBedTime === 0) return 0;
    const efficiency = (totalSleep / totalBedTime) * 100;
    console.log("Calculated Efficiency:", efficiency);
    return efficiency;
  }

  private calculateSleepQuality(
    efficiency: number,
    latency: number,
    duration: number,
    awakenings: number
  ): number {
    const quality =
      0.5 * efficiency + 0.2 * latency + 0.2 * duration + 0.1 * awakenings;
    console.log("Calculated Sleep Quality:", quality);
    return quality;
  }

  private calculateSleepFragmentation(
    awakenings: number,
    duration: number
  ): number {
    if (duration === 0) return 0;
    const fragmentation = (awakenings / duration) * 100;
    console.log("Calculated Sleep Fragmentation:", fragmentation);
    return fragmentation;
  }

  private calculateLatencyIndex(
    sleepLatency: number,
    idealLatency: number = 20
  ): number {
    if (sleepLatency === 0) return 0;
    const latencyIndex = (1 - sleepLatency / idealLatency) * 100;
    console.log("Calculated Latency Index:", latencyIndex);
    return latencyIndex;
  }

  private calculateAverage(values: number[]): number {
    if (values.length === 0) return 0;
    const average =
      values.reduce((acc, value) => acc + value, 0) / values.length;
    console.log("Calculated Average:", average);
    return average;
  }

  public async generateWeeklyReport(userId: string): Promise<IReport> {
    const startOfWeek = this.getStartOfWeek();
    const endOfWeek = this.getEndOfWeek();

    console.log("Start of Week:", startOfWeek);
    console.log("End of Week:", endOfWeek);

    // Aqui realizamos a busca das sessões semanais
    const weeklySessions = await SleepSession.find({
      userId,
      date: { $gte: startOfWeek, $lte: endOfWeek },
    });

    // Verifique o que foi recuperado para garantir que as sessões estão corretas
    console.log("Weekly Sessions:", weeklySessions);

    // Caso não haja sessões, retorne ou trate o caso sem dados
    if (weeklySessions.length === 0) {
      console.log("Nenhuma sessão encontrada para o relatório semanal.");
      return new Report({
          userId,
          weeklySleepQuality: 0,
          monthlySleepQuality: 0,
          averageSleepDuration: 0,
          sleepEfficiency: 0,
          sleepLatencyScore: 0,
          sleepFragmentationScore: 0,
          createdAt: new Date(),
          updatedAt: new Date()
      });
  }

    // Geração do relatório com as sessões recuperadas
    const reportData = this.generateReportFromSessions(weeklySessions);
    const report = new Report({ userId, ...reportData });

    return await report.save();
}


  public async generateMonthlyReport(userId: string): Promise<IReport> {
    const monthlySessions = await SleepSession.find({
      userId,
      date: { $gte: this.getStartOfMonth(), $lte: new Date() },
    });

    const reportData = this.generateReportFromSessions(monthlySessions);
    const report = new Report({ userId, ...reportData });

    return await report.save();
  }

  private generateReportFromSessions(sessions: ISleepSession[]) {
    if (!sessions.length) {
      console.log("No sessions found for report generation.");
      return {
        weeklySleepQuality: 0,
        monthlySleepQuality: 0,
        averageSleepDuration: 0,
        sleepEfficiency: 0,
        sleepLatencyScore: 0,
        sleepFragmentationScore: 0,
      };
    }

    const sessionData = sessions.map((session) => ({
      efficiency: this.calculateSleepEfficiency(
        session.totalSleep,
        session.totalBedTime
      ),
      latency: this.calculateLatencyIndex(session.sleepLatency),
      duration: session.totalSleep / 60,
      awakenings: session.awakenings,
    }));

    return {
      weeklySleepQuality: this.calculateAverage(
        sessionData.map((data) =>
          this.calculateSleepQuality(
            data.efficiency,
            data.latency,
            data.duration,
            data.awakenings
          )
        )
      ),
      monthlySleepQuality: this.calculateAverage(
        sessionData.map((data) =>
          this.calculateSleepQuality(
            data.efficiency,
            data.latency,
            data.duration,
            data.awakenings
          )
        )
      ),
      averageSleepDuration: this.calculateAverage(
        sessionData.map((data) => data.duration * 60)
      ),
      sleepEfficiency: this.calculateAverage(
        sessionData.map((data) => data.efficiency)
      ),
      sleepLatencyScore: this.calculateAverage(
        sessionData.map((data) => data.latency)
      ),
      sleepFragmentationScore: this.calculateAverage(
        sessionData.map((data) =>
          this.calculateSleepFragmentation(data.awakenings, data.duration)
        )
      ),
    };
  }

  private getStartOfWeek(): Date {
    const now = new Date();
    const dayOfWeek = now.getUTCDay();
    const diff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    now.setUTCDate(now.getUTCDate() + diff);
    now.setUTCHours(0, 0, 0, 0);
    return now;
  }

  private getEndOfWeek(): Date {
    const startOfWeek = this.getStartOfWeek();
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setUTCDate(endOfWeek.getUTCDate() + 6);
    endOfWeek.setUTCHours(23, 59, 59, 999);
    return endOfWeek;
  }

  private getStartOfMonth(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }
}

export default ReportService;
