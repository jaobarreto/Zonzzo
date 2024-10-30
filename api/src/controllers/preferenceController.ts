import { Request, Response } from "express";
import mongoose from "mongoose";
import preferenceService from "../services/preferenceService";

interface PreferenceData {
  userId: string;
  sleepDuration: number;
  sleepStartTime: string;
  sleepEndTime: string;
  sleepMusic: string;
  alarmMusic: string;
  alarmDays: string[];
}

const getAllPreferences = async (req: Request, res: Response): Promise<void> => {
  try {
    const preferences = await preferenceService.getAll();
    res.status(200).json({ preferences });
  } catch (error) {
    console.error("Error fetching preferences:", error);
    res.status(500).json({ error: "Error fetching preferences." });
  }
};

const getOnePreference = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid ID format." });
    return;
  }

  try {
    const preference = await preferenceService.getOne(id);

    if (!preference) {
      res.status(404).json({ error: "Preference not found." });
      return;
    }

    res.status(200).json({ preference });
  } catch (error) {
    console.error("Error fetching preference:", error);
    res.status(500).json({ error: "Error fetching preference." });
  }
};

const createPreference = async (req: Request, res: Response): Promise<void> => {
  const { userId, sleepDuration, sleepStartTime, sleepEndTime, sleepMusic, alarmMusic, alarmDays }: PreferenceData = req.body;

  try {
    const newPreference = await preferenceService.create({
      userId,
      sleepDuration,
      sleepStartTime,
      sleepEndTime,
      sleepMusic,
      alarmMusic,
      alarmDays,
    });

    res.status(201).json({ preference: newPreference });
  } catch (error) {
    console.error("Error creating preference:", error);
    res.status(500).json({ error: "Error creating preference." });
  }
};

const deletePreference = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid ID format." });
    return;
  }

  try {
    await preferenceService.delete(id);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting preference:", error);
    res.status(500).json({ error: "Error deleting preference." });
  }
};

const updatePreference = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ error: "Invalid user ID format." });
    return;
  }

  const updateData: Partial<PreferenceData> = req.body;

  try {
    const updatedPreference = await preferenceService.update(userId, updateData);

    if (!updatedPreference) {
      res.status(404).json({ error: "Preference not found for this user." });
      return;
    }

    res.status(200).json({ preference: updatedPreference });
  } catch (error) {
    console.error("Error updating preference:", error);
    res.status(500).json({ error: "Error updating preference." });
  }
};

export { getAllPreferences, getOnePreference, createPreference, deletePreference, updatePreference };
