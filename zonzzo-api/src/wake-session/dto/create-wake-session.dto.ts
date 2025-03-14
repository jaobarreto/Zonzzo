import { IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWakeSessionDto {
  @IsString()
  sleepSessionId: string;

  @IsDate()
  @Type(() => Date)
  wakeDate: Date;

  @IsDate()
  @Type(() => Date)
  wakeTime: Date;

  @IsOptional()
  @IsString()
  dreamNotes?: string;
}
