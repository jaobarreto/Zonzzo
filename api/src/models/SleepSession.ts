import { Schema, model, Document } from 'mongoose';

export interface ISleepSession extends Document {
  userId: string;
  date: Date;
  totalSleep: number; // Total de minutos dormidos
  totalBedTime: number; // Tempo total na cama em minutos
  sleepLatency: number; // Latência do sono em minutos
  awakenings: number; // Número de despertares durante o sono
  sleepStart: Date; // Horário de início do sono
  sleepEnd: Date; // Horário de término do sono
}

const SleepSessionSchema = new Schema<ISleepSession>({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  totalSleep: { type: Number, required: true },
  totalBedTime: { type: Number, required: true },
  sleepLatency: { type: Number, required: true },
  awakenings: { type: Number, required: true },
  sleepStart: { type: Date, required: true },
  sleepEnd: { type: Date, required: true }
});

const SleepSession = model<ISleepSession>('SleepSession', SleepSessionSchema);

export default SleepSession;
