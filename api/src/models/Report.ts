import { Schema, model, Document } from 'mongoose';

export interface IReport extends Document {
  userId: string;
  month: number; // Mês do relatório (1-12)
  year: number; // Ano do relatório
  type: 'monthly' | 'weekly'; // Tipo do relatório

  // Dados do uso do Zonzzo
  daysUsed: number; // Número de dias que o usuário utilizou o Zonzzo no período

  // Dados de sono
  averageSleepDuration: { hours: number; minutes: number }; // Média de horas dormidas
  averageSleepLatency: { hours: number; minutes: number }; // Média de tempo para adormecer
  averageSleepQuality: number; // Média de qualidade de sono (% de 0 a 100)

  // Feedback
  feedbackDisposto: number; // Dias acordando disposto
  feedbackNormal: number; // Dias acordando normal
  feedbackExausto: number; // Dias acordando exausto

  createdAt: Date;
  updatedAt: Date;
}

const ReportSchema = new Schema<IReport>(
  {
    userId: { type: String, required: true },
    month: { type: Number, required: true }, // Exemplo: 11 para Novembro
    year: { type: Number, required: true },
    type: { type: String, enum: ['monthly', 'weekly'], required: true },

    // Uso do Zonzzo
    daysUsed: { type: Number, required: true, default: 0 },

    // Dados de sono
    averageSleepDuration: {
      hours: { type: Number, required: true, default: 0 },
      minutes: { type: Number, required: true, default: 0 },
    },
    averageSleepLatency: {
      hours: { type: Number, required: true, default: 0 },
      minutes: { type: Number, required: true, default: 0 },
    },
    averageSleepQuality: { type: Number, required: true, default: 0 },

    // Feedback
    feedbackDisposto: { type: Number, required: true, default: 0 },
    feedbackNormal: { type: Number, required: true, default: 0 },
    feedbackExausto: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Report = model<IReport>('Report', ReportSchema);

export default Report;
