import { PartialType } from '@nestjs/mapped-types';
import { CreateSleepSessionDto } from './create-sleep-session.dto';

export class UpdateSleepSessionDto extends PartialType(CreateSleepSessionDto) {}
