import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateSleepFeedbackDto {
  @IsString()
  @IsNotEmpty()
  wakeSessionId: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['disposto', 'normal', 'exausto'])
  mood: string;
}
