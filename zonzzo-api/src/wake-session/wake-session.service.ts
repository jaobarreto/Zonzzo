import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWakeSessionDto } from './dto/create-wake-session.dto';
import { UpdateWakeSessionDto } from './dto/update-wake-session.dto';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

@Injectable()
export class WakeSessionService {
  constructor(private readonly prisma: PrismaService) {}

  private formatDateTime(date: Date): string {
    return format(date, "dd/MM/yyyy HH:mm:ss 'Horas'", { locale: ptBR });
  }

  async create(createWakeSessionDto: CreateWakeSessionDto) {
    const wakeSession = await this.prisma.wakeSession.create({
      data: {
        sleepSessionId: createWakeSessionDto.sleepSessionId,
        wakeDate: createWakeSessionDto.wakeDate,
        wakeTime: createWakeSessionDto.wakeTime,
        dreamNotes: createWakeSessionDto.dreamNotes,
      },
    });

    return {
      message: 'Sessão de acordar criada com sucesso!',
      wakeSessionId: wakeSession.id,
    };
  }

  async findAll() {
    const wakeSessions = await this.prisma.wakeSession.findMany({
      select: {
        id: true,
        sleepSessionId: true,
        wakeDate: true,
        wakeTime: true,
        dreamNotes: true,
      },
    });

    return wakeSessions.map((session) => ({
      ...session,
      wakeDate: this.formatDateTime(session.wakeDate),
      wakeTime: this.formatDateTime(session.wakeTime),
    }));
  }

  async findOne(id: string) {
    const wakeSession = await this.prisma.wakeSession.findUnique({
      where: { id },
      select: {
        id: true,
        sleepSessionId: true,
        wakeDate: true,
        wakeTime: true,
        dreamNotes: true,
      },
    });

    if (!wakeSession) {
      throw new NotFoundException('Sessão de acordar não encontrada');
    }

    return {
      ...wakeSession,
      wakeDate: this.formatDateTime(wakeSession.wakeDate),
      wakeTime: this.formatDateTime(wakeSession.wakeTime),
    };
  }

  async update(id: string, data: UpdateWakeSessionDto) {
    const wakeSession = await this.prisma.wakeSession.update({
      where: { id },
      data,
    });

    return {
      message: 'Sessão de acordar atualizada com sucesso!',
      wakeSession: {
        ...wakeSession,
        wakeDate: this.formatDateTime(wakeSession.wakeDate),
        wakeTime: this.formatDateTime(wakeSession.wakeTime),
      },
    };
  }

  async remove(id: string) {
    await this.prisma.wakeSession.delete({ where: { id } });
    return { message: 'Sessão de acordar removida com sucesso!' };
  }
}
