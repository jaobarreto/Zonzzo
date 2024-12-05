import mongoose, { Schema, Document } from "mongoose";

export interface IWakeSession extends Document {
  userId: Schema.Types.ObjectId;
  date: Date;
  mood: string; // Humor ao acordar (ex.: "disposto", "normal", "exausto")
  dreamNotes?: string;
}

const WakeSessionSchema = new Schema<IWakeSession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    mood: { type: String, required: true },
    dreamNotes: { type: String },
  },
  { timestamps: true }
);

const WakeSession = mongoose.model<IWakeSession>("WakeSession", WakeSessionSchema);
export default WakeSession;
