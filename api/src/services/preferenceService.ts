import mongoose from "mongoose";
import Preference, { IPreference } from "../models/Preferences";

interface PreferenceData {
  userId: string;
  sleepDuration: number;
  sleepStartTime: string;
  sleepEndTime: string;
  sleepMusic: string;
  alarmMusic: string;
  alarmDays: string[];
}

class PreferenceService {
  async getAll(): Promise<IPreference[]> {
    try {
      const preferences = await Preference.find();
      return preferences as IPreference[];
    } catch (error) {
      console.error("Error fetching preferences:", error);
      throw new Error("Error fetching preferences.");
    }
  }

  async getOne(id: string): Promise<IPreference> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format.");
    }

    try {
      const preference = await Preference.findById(id);
      if (!preference) throw new Error("Preference not found.");
      return preference as IPreference;
    } catch (error) {
      console.error("Error fetching a specific preference:", error);
      throw new Error("Error fetching a specific preference.");
    }
  }

  async create(data: PreferenceData): Promise<IPreference> {
    try {
      const newPreference = await Preference.create(data);
      return newPreference as IPreference;
    } catch (error) {
      console.error("Error creating preference:", error);
      throw new Error("Error creating preference.");
    }
  }

  async delete(id: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format.");
    }

    try {
      const result = await Preference.findByIdAndDelete(id);
      if (!result) throw new Error("Preference not found.");
      console.log(`Preference with id:${id} has been deleted.`);
    } catch (error) {
      console.error("Error deleting preference:", error);
      throw new Error("Error deleting preference.");
    }
  }

  async update(userId: string, updateData: Partial<PreferenceData>): Promise<IPreference> {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID format.");
    }

    try {
      const updatedPreference = await Preference.findOneAndUpdate(
        { userId },
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!updatedPreference) throw new Error("Preferences not found for this user.");
      return updatedPreference as IPreference;
    } catch (error) {
      console.error("Error updating preference:", error);
      throw new Error("Error updating preference.");
    }
  }
}

export default new PreferenceService();
