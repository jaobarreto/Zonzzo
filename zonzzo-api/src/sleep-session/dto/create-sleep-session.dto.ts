import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSleepSessionDto {
  @IsString()
  userId: string;

  @IsDate()
  @Type(() => Date)
  sleepDate: Date;

  @IsInt()
  minutesSlept: number;

  @IsInt()
  minutesInBed: number;

  @IsInt()
  sleepLatency: number;

  @IsInt()
  awakenings: number;

  @IsDate()
  @Type(() => Date)
  sleepStartTime: Date;

  @IsDate()
  @Type(() => Date)
  sleepEndTime: Date;

  @IsOptional()
  @IsString()
  dailyNotes?: string;
}
