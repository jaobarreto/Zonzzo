import { Module } from '@nestjs/common';
import { SleepSessionService } from './sleep-session.service';
import { SleepSessionController } from './sleep-session.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SleepSessionController],
  providers: [SleepSessionService],
})
export class SleepSessionModule {}
