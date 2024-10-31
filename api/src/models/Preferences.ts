import mongoose, { Document, Schema } from "mongoose";

export interface IPreference extends Document {
  userId: string;
  sleepDuration: number;
  sleepStartTime: string;
  sleepEndTime: string;
  sleepMusic: string;
  alarmMusic: string;
  alarmDays: string[];
}

const preferenceSchema = new Schema<IPreference>({
  userId: { type: String, required: true },
  sleepDuration: { type: Number, required: true },
  sleepStartTime: { type: String, required: true },
  sleepEndTime: { type: String, required: true },
  sleepMusic: { type: String, required: true },
  alarmMusic: { type: String, required: true },
  alarmDays: { type: [String], required: true },
});

const Preference = mongoose.model<IPreference>("Preference", preferenceSchema);
export default Preference;
