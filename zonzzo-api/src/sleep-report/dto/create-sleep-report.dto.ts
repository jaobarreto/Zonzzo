import { IsString, IsNumber, IsEnum, IsISO8601 } from 'class-validator';
import { ReportType } from '@prisma/client';

export class CreateSleepReportDto {
  @IsString()
  userId: string;

  @IsISO8601()
  date: string;

  @IsEnum(ReportType)
  type: ReportType;

  @IsNumber()
  sleepEfficiency: number;

  @IsNumber()
  avgSleepHours: number;

  @IsNumber()
  sleepFragmentation: number;

  @IsNumber()
  latencyIndex: number;
}
