import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { SleepSessionModule } from './sleep-session/sleep-session.module';
import { WakeSessionModule } from './wake-session/wake-session.module';
import { SleepFeedbackModule } from './sleep-feedback/sleep-feedback.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    SleepSessionModule,
    WakeSessionModule,
    SleepFeedbackModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}
