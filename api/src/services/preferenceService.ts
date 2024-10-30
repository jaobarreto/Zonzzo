import Preference from "../models/Preferences";
import { ObjectId } from "mongodb";

class PreferenceService {
  async getAll() {
    try {
      const preferences = await Preference.find();
      return preferences;
    } catch (error) {
      console.error("Error fetching preferences:", error);
      throw new Error("Error fetching preferences.");
    }
  }

  async getOne(id: ObjectId) {
    try {
      const preference = await Preference.findById(id);
      if (!preference) throw new Error("Preference not found.");
      return preference;
    } catch (error) {
      console.error("Error fetching a specific preference:", error);
      throw new Error("Error fetching a specific preference.");
    }
  }

  async create(data: {
    userId: string;
    sleepDuration: number;
    sleepStartTime: string;
    sleepEndTime: string;
    sleepMusic: string;
    alarmMusic: string;
    alarmDays: string[];
  }) {
    try {
      const newPreference = await Preference.create(data);
      return newPreference;
    } catch (error) {
      console.error("Error creating preference:", error);
      throw new Error("Error creating preference.");
    }
  }

  async delete(id: ObjectId) {
    try {
      const result = await Preference.findByIdAndDelete(id);
      if (!result) throw new Error("Preference not found.");
      console.log(`Preference with id:${id} has been deleted.`);
    } catch (error) {
      console.error("Error deleting preference:", error);
      throw new Error("Error deleting preference.");
    }
  }

  async update(userId: string, updateData: {
    sleepDuration?: number;
    sleepStartTime?: string;
    sleepEndTime?: string;
    sleepMusic?: string;
    alarmMusic?: string;
    alarmDays?: string[];
  }) {
    try {
      const updatedPreference = await Preference.findOneAndUpdate(
        { userId },
        { $set: updateData },
        { new: true }
      );

      if (!updatedPreference) throw new Error("Preferences not found for this user.");
      return updatedPreference;
    } catch (error) {
      console.error("Error updating preference:", error);
      throw new Error("Error updating preference.");
    }
  }
}

export default new PreferenceService();
