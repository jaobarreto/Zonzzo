import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SleepMetricsService {
  private readonly logger = new Logger(SleepMetricsService.name);

  calculateSleepMetrics(sessions: any[]) {
    if (!sessions.length) return null;

    const totalMinutesSlept = sessions.reduce(
      (sum, s) => sum + s.minutesSlept,
      0,
    );
    const totalMinutesInBed = sessions.reduce(
      (sum, s) => sum + s.minutesInBed,
      0,
    );
    const totalLatency = sessions.reduce(
      (sum, s) => sum + (s.sleepLatency || 0),
      0,
    );
    const totalAwakenings = sessions.reduce(
      (sum, s) => sum + (s.awakenings || 0),
      0,
    );

    const daysUsed = new Set(
      sessions.map((s) => s.sleepEndTime.toISOString().split('T')[0]),
    ).size;

    if (totalMinutesSlept === 0 || totalMinutesInBed === 0) return null;

    const avgSleepHours = Number(
      (totalMinutesSlept / (daysUsed * 60)).toFixed(2),
    );
    const avgSleepLatency =
      daysUsed > 0 ? Number((totalLatency / daysUsed).toFixed(2)) : 0;
    const avgSleepEfficiency = Number(
      ((totalMinutesSlept / totalMinutesInBed) * 100).toFixed(2),
    );
    const sleepFragmentation =
      totalMinutesSlept > 0
        ? Number(((totalAwakenings / totalMinutesSlept) * 100).toFixed(2))
        : 0;
    const latencyIndex =
      daysUsed > 0 && totalLatency > 0
        ? Number(((1 - totalLatency / daysUsed / 20) * 100).toFixed(2))
        : 100;

    return {
      daysUsed,
      avgSleepHours,
      avgSleepLatency,
      avgSleepEfficiency,
      sleepFragmentation,
      latencyIndex,
    };
  }
}
