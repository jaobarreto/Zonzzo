import { Request, Response } from "express";
import mongoose from "mongoose";
import preferenceService from "../services/preferenceService";
import { ISleepGoal } from "../models/Preference";

const createPreference = async (req: Request, res: Response): Promise<void> => {
  const {
    userId,
    wakeInterval,
    sleepStartTime,
    sleepEndTime,
    sleepMusic,
    alarmMusic,
    alarmDays,
    sleepGoals,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ error: "Invalid user ID format." });
    return;
  }

  try {
    const preference = await preferenceService.createPreference({
      userId,
      wakeInterval,
      sleepStartTime,
      sleepEndTime,
      sleepMusic,
      alarmMusic,
      alarmDays,
      sleepGoals,
    });

    res.status(201).json({ preference });
  } catch (error) {
    console.error("Error creating preference:", error);
    res.status(500).json({ error: "Error creating preference." });
  }
};

const getAllPreferences = async (req: Request, res: Response): Promise<void> => {
  try {
    const preferences = await preferenceService.getAllPreferences();
    res.status(200).json({ preferences });
  } catch (error) {
    console.error("Error fetching preferences:", error);
    res.status(500).json({ error: "Error fetching preferences." });
  }
};

const getPreferenceByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ error: "Invalid user ID format." });
    return;
  }

  try {
    const preference = await preferenceService.getPreferenceByUserId(userId);
    res.status(200).json({ preference });
  } catch (error) {
    console.error("Error fetching preference by user ID:", error);
    res.status(500).json({ error: "Error fetching preference." });
  }
};

const updatePreference = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const {
    wakeInterval,
    sleepStartTime,
    sleepEndTime,
    sleepMusic,
    alarmMusic,
    alarmDays,
    sleepGoals,
  }: Partial<{
    wakeInterval: number;
    sleepStartTime: string;
    sleepEndTime: string;
    sleepMusic: string;
    alarmMusic: string;
    alarmDays: string[];
    sleepGoals: ISleepGoal[];
  }> = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ error: "Invalid user ID format." });
    return;
  }

  try {
    const updatedPreference = await preferenceService.updatePreference(userId, {
      wakeInterval,
      sleepStartTime,
      sleepEndTime,
      sleepMusic,
      alarmMusic,
      alarmDays,
      sleepGoals,
    });

    res.status(200).json({ updatedPreference });
  } catch (error) {
    console.error("Error updating preference:", error);
    res.status(500).json({ error: "Error updating preference." });
  }
};

const deletePreference = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ error: "Invalid user ID format." });
    return;
  }

  try {
    await preferenceService.deletePreference(userId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting preference:", error);
    res.status(500).json({ error: "Error deleting preference." });
  }
};

export {
  createPreference,
  getAllPreferences,
  getPreferenceByUserId,
  updatePreference,
  deletePreference,
};
