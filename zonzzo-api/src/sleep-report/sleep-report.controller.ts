import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { SleepReportService } from './sleep-report.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('reports')
@UseGuards(AuthGuard('jwt'))
export class SleepReportController {
  constructor(private readonly sleepReportService: SleepReportService) {}

  @Get()
  async getReport(
    @Req() req,
    @Query('type') type: 'diario' | 'semanal' | 'mensal',
  ) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new BadRequestException('Usuário não autenticado.');
    }

    if (!type || !['diario', 'semanal', 'mensal'].includes(type)) {
      throw new BadRequestException(
        'Tipo de relatório inválido. Escolha entre: diario, semanal ou mensal.',
      );
    }

    return this.sleepReportService.getReport(userId, type);
  }
}
