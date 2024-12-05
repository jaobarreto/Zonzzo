import mongoose, { Schema, Document } from "mongoose";

export interface ISleepSession extends Document {
  userId: Schema.Types.ObjectId;
  date: Date; // Data do sono (geralmente dia anterior ao despertar)
  totalSleep: number; // Total de minutos dormidos
  totalBedTime: number; // Tempo total na cama em minutos
  sleepLatency: number; // Latência do sono em minutos
  awakenings: number; // Número de despertares durante o sono
  sleepStart: Date; // Horário de início do sono
  sleepEnd: Date; // Horário de término do sono
  dailyNotes?: string; // Notas sobre como foi o dia
}

const SleepSessionSchema = new Schema<ISleepSession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    totalSleep: { type: Number, required: true }, // Minutos
    totalBedTime: { type: Number, required: true }, // Minutos
    sleepLatency: { type: Number, required: true }, // Minutos
    awakenings: { type: Number, required: true },
    sleepStart: { type: Date, required: true },
    sleepEnd: { type: Date, required: true },
    dailyNotes: { type: String }, // Opcional
  },
  { timestamps: true }
);

const SleepSession = mongoose.model<ISleepSession>("SleepSession", SleepSessionSchema);
export default SleepSession;
