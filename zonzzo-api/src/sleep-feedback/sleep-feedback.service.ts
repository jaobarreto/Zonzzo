import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSleepFeedbackDto } from './dto/create-sleep-feedback.dto';
import { UpdateSleepFeedbackDto } from './dto/update-sleep-feedback.dto';

@Injectable()
export class SleepFeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSleepFeedbackDto: CreateSleepFeedbackDto) {
    const sleepFeedback = await this.prisma.sleepFeedback.create({
      data: {
        wakeSessionId: createSleepFeedbackDto.wakeSessionId,
        mood: createSleepFeedbackDto.mood,
      },
    });

    return {
      message: 'Feedback de Sono criado com sucesso!',
      sleepFeedbackId: sleepFeedback.id,
    };
  }

  async findAll() {
    return this.prisma.sleepFeedback.findMany({
      select: {
        id: true,
        mood: true,
      },
    });
  }

  async findOne(id: string) {
    const sleepFeedback = await this.prisma.sleepFeedback.findUnique({
      where: { id },
      select: { id: true, mood: true },
    });

    if (!sleepFeedback) {
      throw new NotFoundException('Feedback não encontrado');
    }

    return sleepFeedback;
  }

  async update(id: string, updateSleepFeedbackDto: UpdateSleepFeedbackDto) {
    return this.prisma.sleepFeedback.update({
      where: { id },
      data: updateSleepFeedbackDto,
    });
  }

  async remove(id: string) {
    return this.prisma.sleepFeedback.delete({
      where: { id },
    });
  }
}
