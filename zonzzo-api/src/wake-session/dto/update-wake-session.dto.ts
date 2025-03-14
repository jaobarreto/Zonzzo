import { PartialType } from '@nestjs/mapped-types';
import { CreateWakeSessionDto } from './create-wake-session.dto';

export class UpdateWakeSessionDto extends PartialType(CreateWakeSessionDto) {}
