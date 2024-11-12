import mongoose, { Schema, Document, Types } from "mongoose";

export interface IReport extends Document {
  userId: Types.ObjectId;
  weeklySleepAverage: number;
  monthlySleepAverage: number;
  weeklySleepQuality: number;
  monthlySleepQuality: number;
  weeklyEnergyLevel: number;
  monthlyEnergyLevel: number;
}

const reportSchema = new Schema<IReport>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    weeklySleepAverage: { type: Number, required: true },
    monthlySleepAverage: { type: Number, required: true },
    weeklySleepQuality: { type: Number, required: true },
    monthlySleepQuality: { type: Number, required: true },
    weeklyEnergyLevel: { type: Number, required: false },
    monthlyEnergyLevel: { type: Number, required: false },
  },
  { timestamps: true }
);

const Report = mongoose.model<IReport>("Report", reportSchema);
export default Report;
