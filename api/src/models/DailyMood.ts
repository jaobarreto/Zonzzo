import mongoose, { Schema, Document } from "mongoose";

export interface IDailyMood extends Document {
  userId: Schema.Types.ObjectId;
  date: Date;
  mood: string;
  energyLevel: number;
}

const dailyMoodSchema = new Schema<IDailyMood>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    mood: { type: String, required: true },
    energyLevel: { type: Number, required: true },
  },
  { timestamps: true }
);

const DailyMood = mongoose.model<IDailyMood>("DailyMood", dailyMoodSchema);
export default DailyMood;
