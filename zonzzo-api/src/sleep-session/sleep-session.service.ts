import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSleepSessionDto } from './dto/create-sleep-session.dto';
import { UpdateSleepSessionDto } from './dto/update-sleep-session.dto';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

@Injectable()
export class SleepSessionService {
  constructor(private readonly prisma: PrismaService) {}

  private formatDateTime(date: Date): string {
    return format(date, "dd/MM/yyyy HH:mm:ss 'Horas'", { locale: ptBR });
  }

  async create(createSleepSessionDto: CreateSleepSessionDto) {
    const sleepSession = await this.prisma.sleepSession.create({
      data: {
        userId: createSleepSessionDto.userId,
        sleepDate: createSleepSessionDto.sleepDate,
        minutesSlept: createSleepSessionDto.minutesSlept,
        minutesInBed: createSleepSessionDto.minutesInBed,
        sleepLatency: createSleepSessionDto.sleepLatency,
        awakenings: createSleepSessionDto.awakenings,
        sleepStartTime: createSleepSessionDto.sleepStartTime,
        sleepEndTime: createSleepSessionDto.sleepEndTime,
        dailyNotes: createSleepSessionDto.dailyNotes,
      },
    });

    return {
      message: 'Sessão de sono criada com sucesso!',
      sleepSessionId: sleepSession.id,
    };
  }

  async findAll() {
    const sleepSessions = await this.prisma.sleepSession.findMany({
      select: {
        id: true,
        userId: true,
        sleepDate: true,
        minutesSlept: true,
        minutesInBed: true,
        sleepLatency: true,
        awakenings: true,
        sleepStartTime: true,
        sleepEndTime: true,
        dailyNotes: true,
      },
    });

    return sleepSessions.map((session) => ({
      ...session,
      sleepDate: this.formatDateTime(session.sleepDate),
      sleepStartTime: this.formatDateTime(session.sleepStartTime),
      sleepEndTime: this.formatDateTime(session.sleepEndTime),
    }));
  }

  async findOne(id: string) {
    const sleepSession = await this.prisma.sleepSession.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        sleepDate: true,
        minutesSlept: true,
        minutesInBed: true,
        sleepLatency: true,
        awakenings: true,
        sleepStartTime: true,
        sleepEndTime: true,
        dailyNotes: true,
      },
    });

    if (!sleepSession) {
      throw new NotFoundException('Sessão de sono não encontrada');
    }

    return {
      ...sleepSession,
      sleepDate: this.formatDateTime(sleepSession.sleepDate),
      sleepStartTime: this.formatDateTime(sleepSession.sleepStartTime),
      sleepEndTime: this.formatDateTime(sleepSession.sleepEndTime),
    };
  }

  async update(id: string, data: UpdateSleepSessionDto) {
    const sleepSession = await this.prisma.sleepSession.update({
      where: { id },
      data,
    });

    return {
      message: 'Sessão de sono atualizada com sucesso!',
      sleepSession: {
        ...sleepSession,
        sleepDate: this.formatDateTime(sleepSession.sleepDate),
        sleepStartTime: this.formatDateTime(sleepSession.sleepStartTime),
        sleepEndTime: this.formatDateTime(sleepSession.sleepEndTime),
      },
    };
  }

  async remove(id: string) {
    await this.prisma.sleepSession.delete({ where: { id } });
    return { message: 'Sessão de sono removida com sucesso!' };
  }
}
