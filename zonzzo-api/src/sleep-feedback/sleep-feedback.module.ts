import { Module } from '@nestjs/common';
import { SleepFeedbackService } from './sleep-feedback.service';
import { SleepFeedbackController } from './sleep-feedback.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SleepFeedbackController],
  providers: [SleepFeedbackService],
})
export class SleepFeedbackModule {}
