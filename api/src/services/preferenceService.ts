import mongoose from "mongoose";
import Preference, { IPreference, ISleepGoal } from "../models/Preference";
import User from "../models/User";

interface PreferenceData {
  userId: string;
  wakeInterval: number;
  sleepStartTime: string;
  sleepEndTime: string;
  sleepMusic: string;
  alarmMusic: string;
  alarmDays: string[];
  sleepGoals?: ISleepGoal[];
}

class PreferenceService {
  async createPreference(data: PreferenceData): Promise<IPreference> {
    if (!mongoose.Types.ObjectId.isValid(data.userId)) {
      throw new Error("Invalid user ID format.");
    }

    try {
      const newPreference = await Preference.create(data);

      await User.findByIdAndUpdate(data.userId, {
        $push: { preferences: newPreference._id },
      });

      return newPreference;
    } catch (error) {
      console.error("Error creating preference:", error);
      throw new Error("Error creating preference.");
    }
  }

  async getAllPreferences(): Promise<IPreference[]> {
    try {
      return await Preference.find();
    } catch (error) {
      console.error("Error fetching preferences:", error);
      throw new Error("Error fetching preferences.");
    }
  }

  async getPreferenceByUserId(userId: string): Promise<IPreference> {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID format.");
    }

    try {
      const preference = await Preference.findOne({ userId });
      if (!preference) throw new Error("Preference not found.");
      return preference;
    } catch (error) {
      console.error("Error fetching preference by user ID:", error);
      throw new Error("Error fetching preference.");
    }
  }

  async updatePreference(
    userId: string,
    updateData: Partial<PreferenceData>
  ): Promise<IPreference> {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID format.");
    }

    try {
      const updatedPreference = await Preference.findOneAndUpdate(
        { userId },
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!updatedPreference) throw new Error("Preference not found.");
      return updatedPreference;
    } catch (error) {
      console.error("Error updating preference:", error);
      throw new Error("Error updating preference.");
    }
  }

  async deletePreference(userId: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID format.");
    }

    try {
      const deletedPreference = await Preference.findOneAndDelete({ userId });

      if (!deletedPreference) throw new Error("Preference not found.");

      console.log(`Preference for user ID ${userId} has been deleted.`);
    } catch (error) {
      console.error("Error deleting preference:", error);
      throw new Error("Error deleting preference.");
    }
  }
}

export default new PreferenceService();
