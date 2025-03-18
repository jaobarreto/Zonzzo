import { Injectable, Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { PrismaService } from '../prisma/prisma.service';
import { Cache } from 'cache-manager';
import { ReportType } from '@prisma/client';
import { SleepMetricsService } from './sleep-metrics.service';

@Injectable()
export class SleepReportService {
  private readonly logger = new Logger(SleepReportService.name);

  constructor(
    private prisma: PrismaService,
    private sleepMetricsService: SleepMetricsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getReport(userId: string, type: string) {
    try {
      const { startDate, endDate } = this.getDateRange(type);
      const cacheKey = this.getCacheKey(userId, type, startDate, endDate);

      const cachedReport = await this.cacheManager.get(cacheKey);
      if (cachedReport) {
        this.logger.log(`Cache HIT para ${cacheKey}`);
        return cachedReport;
      }

      let storedReport = await this.prisma.sleepReport.findFirst({
        where: {
          userId,
          date: startDate,
          type: type.toUpperCase() as ReportType,
        },
      });

      if (!storedReport) {
        storedReport = await this.createEmptyReport(userId, type, startDate);
      }

      const sleepSessions = await this.prisma.sleepSession.findMany({
        where: {
          userId,
          sleepEndTime: { gte: startDate, lte: endDate },
        },
        include: { wakeSession: { include: { sleepFeedback: true } } },
      });

      if (sleepSessions.length > 0) {
        const reportData =
          this.sleepMetricsService.calculateSleepMetrics(sleepSessions);
        if (reportData) {
          storedReport = await this.updateReport(storedReport.id, reportData);
          await this.cacheManager.set(cacheKey, storedReport, 86400);
        }
      }

      return storedReport;
    } catch (error) {
      this.logger.error('Erro ao gerar relatório de sono:', error.stack);
      throw new Error('Erro ao gerar relatório de sono.');
    }
  }

  private async createEmptyReport(
    userId: string,
    type: string,
    startDate: Date,
  ) {
    return await this.prisma.sleepReport.create({
      data: {
        userId,
        date: startDate,
        type: type.toUpperCase() as ReportType,
        daysUsed: 0,
        avgSleepHours: 0,
        avgSleepLatency: 0,
        avgSleepEfficiency: 0,
        sleepFragmentation: 0,
        latencyIndex: 0,
      },
    });
  }

  private async updateReport(reportId: string, data: any) {
    return await this.prisma.sleepReport.update({
      where: { id: reportId },
      data,
    });
  }

  private getCacheKey(
    userId: string,
    type: string,
    startDate: Date,
    endDate: Date,
  ) {
    return `report:${userId}:${type}:${startDate.toISOString().split('T')[0]}:${endDate.toISOString().split('T')[0]}`;
  }

  private getDateRange(type: string) {
    const now = new Date();
    let startDate: Date;
    let endDate: Date;

    switch (type.toUpperCase()) {
      case 'DIARIO':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        endDate = new Date(startDate);
        break;
      case 'SEMANAL':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - now.getDay());
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        break;
      case 'MENSAL':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      default:
        throw new Error('Tipo de relatório inválido');
    }

    return { startDate, endDate };
  }
}
