import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { SleepSessionModule } from './sleep-session/sleep-session.module';
import { WakeSessionModule } from './wake-session/wake-session.module';
import { SleepFeedbackModule } from './sleep-feedback/sleep-feedback.module';
import { SleepReportModule } from './sleep-report/sleep-report.module';
import { SleepMetricsService } from './sleep-report/sleep-metrics.service';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 60 * 60 * 24,
      isGlobal: true,
    }),
    UserModule,
    PrismaModule,
    AuthModule,
    SleepSessionModule,
    WakeSessionModule,
    SleepFeedbackModule,
    SleepReportModule,
  ],
  controllers: [AuthController],
  providers: [SleepMetricsService],
})
export class AppModule {}
