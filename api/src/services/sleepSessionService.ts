import SleepSession, { ISleepSession } from '../models/SleepSession';

class SleepSessionService {
  public async createSession(sessionData: {
    userId: string;
    sleepStart: string;
    sleepEnd: string;
    sleepLatency: number;
    awakenings: number;
  }): Promise<ISleepSession> {
    const { sleepStart, sleepEnd } = sessionData;
    const start = new Date(sleepStart);
    const end = new Date(sleepEnd);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error('Invalid sleep start or end date');
    }

    if (start >= end) {
      throw new Error('Sleep start must be before sleep end');
    }

    const totalSleep = this.calculateTotalSleep(start, end);
    const totalBedTime = this.calculateTotalBedTime(start, end);

    const session = new SleepSession({
      ...sessionData,
      sleepStart: start,
      sleepEnd: end,
      totalSleep,
      totalBedTime,
      date: start
    });

    return await session.save();
  }

  public async getSessionsByUser(userId: string): Promise<ISleepSession[]> {
    return await SleepSession.find({ userId }).sort({ date: -1 }).exec();
  }

  public async updateSession(
    sessionId: string,
    updateData: Partial<ISleepSession>
  ): Promise<ISleepSession | null> {
    const session = await SleepSession.findById(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    // Verifica se sleepStart e sleepEnd estão definidos para recalcular os valores
    if (updateData.sleepStart && updateData.sleepEnd) {
      updateData.totalSleep = this.calculateTotalSleep(updateData.sleepStart, updateData.sleepEnd);
      updateData.totalBedTime = this.calculateTotalBedTime(updateData.sleepStart, updateData.sleepEnd);
    }

    Object.assign(session, updateData);
    return await session.save();
  }

  public async deleteSession(sessionId: string): Promise<void> {
    await SleepSession.findByIdAndDelete(sessionId);
  }

  // Função para calcular o total de sono em minutos
  private calculateTotalSleep(sleepStart: Date, sleepEnd: Date): number {
    return (sleepEnd.getTime() - sleepStart.getTime()) / (1000 * 60); // Converte milissegundos para minutos
  }

  // Função para calcular o tempo total na cama
  private calculateTotalBedTime(sleepStart: Date, sleepEnd: Date): number {
    return this.calculateTotalSleep(sleepStart, sleepEnd);
  }
}

export default SleepSessionService;
