import { PartialType } from '@nestjs/mapped-types';
import { CreateSleepFeedbackDto } from './create-sleep-feedback.dto';

export class UpdateSleepFeedbackDto extends PartialType(CreateSleepFeedbackDto) {}
