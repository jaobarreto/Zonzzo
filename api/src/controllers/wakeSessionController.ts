import { Request, Response } from "express";
import mongoose from "mongoose";
import wakeSessionService from "../services/wakeSessionService";

interface WakeSessionData {
  userId: string;
  date: Date;
  mood: string;
  dreamNotes?: string;
}

const createWakeSession = async (req: Request, res: Response): Promise<void> => {
  const { userId, date, mood, dreamNotes }: WakeSessionData = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ error: "Invalid user ID format." });
    return;
  }

  try {
    const wakeSession = await wakeSessionService.createWakeSession({
      userId: new mongoose.Types.ObjectId(userId),
      date,
      mood,
      dreamNotes,
    });

    res.status(201).json({ wakeSession });
  } catch (error) {
    console.error("Error creating wake session:", error);
    res.status(500).json({ error: "Error creating wake session." });
  }
};

const getWakeSessionsForUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ error: "Invalid user ID format." });
    return;
  }

  try {
    const wakeSessions = await wakeSessionService.getWakeSessionsForUser(
      new mongoose.Types.ObjectId(userId)
    );
    res.status(200).json({ wakeSessions });
  } catch (error) {
    console.error("Error fetching wake sessions:", error);
    res.status(500).json({ error: "Error fetching wake sessions." });
  }
};

const updateWakeSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { sessionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    res.status(400).json({ error: "Invalid session ID format." });
    return;
  }

  const { mood, dreamNotes }: Partial<WakeSessionData> = req.body;

  if (mood === undefined) {
    res.status(400).json({ error: "Mood is required." });
    return;
  }

  try {
    const updatedWakeSession = await wakeSessionService.updateWakeSession(
      new mongoose.Types.ObjectId(sessionId),
      { mood, dreamNotes }
    );

    if (!updatedWakeSession) {
      res.status(404).json({ error: "Wake session not found." });
      return;
    }

    res.status(200).json({ updatedWakeSession });
  } catch (error) {
    console.error("Error updating wake session:", error);
    res.status(500).json({ error: "Error updating wake session." });
  }
};

const deleteWakeSession = async (req: Request, res: Response): Promise<void> => {
  const { sessionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    res.status(400).json({ error: "Invalid session ID format." });
    return;
  }

  try {
    const deletedWakeSession = await wakeSessionService.deleteWakeSession(
      new mongoose.Types.ObjectId(sessionId)
    );

    if (!deletedWakeSession) {
      res.status(404).json({ error: "Wake session not found." });
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting wake session:", error);
    res.status(500).json({ error: "Error deleting wake session." });
  }
};

const getWakeSessionStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ error: "Invalid user ID format." });
    return;
  }

  try {
    const stats = await wakeSessionService.calculateMoodStats(
      new mongoose.Types.ObjectId(userId)
    );

    res.status(200).json({ stats });
  } catch (error) {
    console.error("Error fetching wake session stats:", error);
    res.status(500).json({ error: "Error fetching wake session stats." });
  }
};

export {
  createWakeSession,
  getWakeSessionsForUser,
  updateWakeSession,
  deleteWakeSession,
  getWakeSessionStats,
};
