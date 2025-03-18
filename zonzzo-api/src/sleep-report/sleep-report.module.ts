import { Module } from '@nestjs/common';
import { SleepReportService } from './sleep-report.service';
import { SleepMetricsService } from './sleep-metrics.service';
import { SleepReportController } from './sleep-report.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SleepReportController],
  providers: [SleepReportService, SleepMetricsService],
})
export class SleepReportModule {}
