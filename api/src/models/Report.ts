import { Schema, model, Document } from 'mongoose';

export interface IReport extends Document {
  userId: string;
  weeklySleepQuality: number; // Pontuação da qualidade do sono semanal
  monthlySleepQuality: number; // Pontuação da qualidade do sono mensal
  averageSleepDuration: number; // Média de duração do sono em minutos
  sleepEfficiency: number; // Eficiência do sono (%)
  sleepLatencyScore: number; // Índice de Latência do Sono
  sleepFragmentationScore: number; // Pontuação de Fragmentação do Sono
  createdAt: Date;
  updatedAt: Date;
}

const ReportSchema = new Schema<IReport>(
  {
    userId: { type: String, required: true },
    weeklySleepQuality: { type: Number, required: true, default: 0 },
    monthlySleepQuality: { type: Number, required: true, default: 0 },
    averageSleepDuration: { type: Number, required: true, default: 0 },
    sleepEfficiency: { type: Number, required: true, default: 0 },
    sleepLatencyScore: { type: Number, required: true, default: 0 },
    sleepFragmentationScore: { type: Number, required: true, default: 0 }
  },
  {
    timestamps: true
  }
);


const Report = model<IReport>('Report', ReportSchema);

export default Report;
