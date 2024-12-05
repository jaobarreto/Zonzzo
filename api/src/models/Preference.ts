import mongoose from "mongoose";

export interface ISleepGoal {
  day: string;
  sleepTime: string;
  wakeTime: string;
}

const validDays = [
  "Segunda-feira", "Terça-feira", "Quarta-feira",
  "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"
];

const PreferenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  wakeInterval: { type: Number, required: true },
  sleepStartTime: { type: String, required: true },
  sleepEndTime: { type: String, required: true },
  sleepMusic: { type: String, required: true },
  alarmMusic: { type: String, required: true },
  alarmDays: {
    type: [String],
    required: true,
    validate: {
      validator: function (value: string[]) {
        return value.every(day => validDays.includes(day));
      },
      message: "Some days are invalid. Valid days are: 'Segunda-feira', 'Terça-feira', etc."
    }
  },
  sleepGoals: {
    type: [
      {
        day: { type: String, required: true, enum: validDays },
        sleepTime: { type: String, required: true },
        wakeTime: { type: String, required: true },
      }
    ],
    default: [],
  },
});

export interface IPreference extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  wakeInterval: number;
  sleepStartTime: string;
  sleepEndTime: string;
  sleepMusic: string;
  alarmMusic: string;
  alarmDays: string[];
  sleepGoals: ISleepGoal[];
}

export default mongoose.model<IPreference>("Preference", PreferenceSchema);
