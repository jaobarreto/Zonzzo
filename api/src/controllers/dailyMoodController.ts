import { Request, Response } from "express";
import mongoose from "mongoose";
import dailyMoodService from "../services/dailyMoodService";

interface DailyMoodData {
  userId: string;
  date: Date;
  mood: number;
  energyLevel: number;
}

const createMood = async (req: Request, res: Response): Promise<void> => {
  const { userId, date, mood, energyLevel }: DailyMoodData = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ error: "Invalid user ID format." });
    return;
  }

  try {
    const dailyMood = await dailyMoodService.createMood({
      userId: new mongoose.Types.ObjectId(userId),
      date,
      mood,
      energyLevel,
    });

    res.status(201).json({ dailyMood });
  } catch (error) {
    console.error("Error creating daily mood:", error);
    res.status(500).json({ error: "Error creating daily mood." });
  }
};

const getMoodsForUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ error: "Invalid user ID format." });
    return;
  }

  try {
    const dailyMoods = await dailyMoodService.getMoodsForUser(
      new mongoose.Types.ObjectId(userId)
    );
    res.status(200).json({ dailyMoods });
  } catch (error) {
    console.error("Error fetching daily moods:", error);
    res.status(500).json({ error: "Error fetching daily moods." });
  }
};

const updateMood = async (req: Request, res: Response): Promise<void> => {
  const { moodId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(moodId)) {
    res.status(400).json({ error: "Invalid mood ID format." });
    return;
  }

  const { mood, energyLevel }: Partial<DailyMoodData> = req.body;

  if (mood === undefined || energyLevel === undefined) {
    res.status(400).json({ error: "Mood and energy level are required." });
    return;
  }

  try {
    const updatedMood = await dailyMoodService.updateMood(
      new mongoose.Types.ObjectId(moodId),
      { mood, energyLevel }
    );

    if (!updatedMood) {
      res.status(404).json({ error: "Mood not found." });
      return;
    }

    res.status(200).json({ updatedMood });
  } catch (error) {
    console.error("Error updating daily mood:", error);
    res.status(500).json({ error: "Error updating daily mood." });
  }
};

const deleteMood = async (req: Request, res: Response): Promise<void> => {
  const { moodId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(moodId)) {
    res.status(400).json({ error: "Invalid mood ID format." });
    return;
  }

  try {
    const deletedMood = await dailyMoodService.deleteMood(
      new mongoose.Types.ObjectId(moodId)
    );

    if (!deletedMood) {
      res.status(404).json({ error: "Mood not found." });
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting daily mood:", error);
    res.status(500).json({ error: "Error deleting daily mood." });
  }
};

const getMoodStats = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ error: "Invalid user ID format." });
    return;
  }

  try {
    const stats = await dailyMoodService.calculateMoodStats(
      new mongoose.Types.ObjectId(userId)
    );

    res.status(200).json({ stats });
  } catch (error) {
    console.error("Error fetching mood stats:", error);
    res.status(500).json({ error: "Error fetching mood stats." });
  }
};

export { createMood, getMoodsForUser, updateMood, deleteMood, getMoodStats };
