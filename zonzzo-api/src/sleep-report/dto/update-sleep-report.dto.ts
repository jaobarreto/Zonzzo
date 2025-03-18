import { PartialType } from '@nestjs/mapped-types';
import { CreateSleepReportDto } from './create-sleep-report.dto';

export class UpdateSleepReportDto extends PartialType(CreateSleepReportDto) {}
