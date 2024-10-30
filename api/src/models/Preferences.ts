import mongoose, { Schema, Document } from "mongoose";

interface IPreference extends Document {
  userId: Schema.Types.ObjectId;
  duration: number;
  startTime: string;
  endTime: string;
  sleepMusic: string;
  alarmMusic: string;
  alarmDays: string[];
}

const preferenceSchema = new Schema<IPreference>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    duration: { type: Number, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    sleepMusic: { type: String, required: true },
    alarmMusic: { type: String, required: true },
    alarmDays: { type: [String], required: true },
  },
  { timestamps: true }
);

const Preference = mongoose.model<IPreference>("Preference", preferenceSchema);
export default Preference;
