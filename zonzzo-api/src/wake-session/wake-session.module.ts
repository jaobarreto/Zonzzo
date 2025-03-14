import { Module } from '@nestjs/common';
import { WakeSessionService } from './wake-session.service';
import { WakeSessionController } from './wake-session.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WakeSessionController],
  providers: [WakeSessionService],
})
export class WakeSessionModule {}
