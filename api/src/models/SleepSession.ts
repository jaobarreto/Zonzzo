import mongoose, { Schema, Document } from "mongoose";

export interface ISleepSession extends Document {
  userId: Schema.Types.ObjectId;
  date: Date;
  sleepDuration: number;
  sleepQuality: number;
  sleepLatency: number;
}

const sleepSessionSchema = new Schema<ISleepSession>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  sleepDuration: { type: Number, required: true },
  sleepQuality: { type: Number, required: true },
  sleepLatency: { type: Number, required: true },
}, { timestamps: true });

const SleepSession = mongoose.model<ISleepSession>("SleepSession", sleepSessionSchema);

export default SleepSession;
