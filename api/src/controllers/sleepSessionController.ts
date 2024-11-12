import { Request, Response } from "express";
import mongoose from "mongoose";
import sleepSessionService from "../services/sleepSessionService";

interface SleepSessionData {
  userId: string;
  date: Date;
  sleepDuration: number;
  sleepQuality: number;
  sleepLatency: number;
}

const createSleepSession = async (req: Request, res: Response): Promise<void> => {
  const { userId, date, sleepDuration, sleepQuality, sleepLatency }: SleepSessionData = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ error: "Invalid user ID format." });
    return;
  }

  try {
    const sleepSession = await sleepSessionService.createSession({
      userId: new mongoose.Types.ObjectId(userId),
      date,
      sleepDuration,
      sleepQuality,
      sleepLatency,
    });

    res.status(201).json({ sleepSession });
  } catch (error) {
    console.error("Error creating sleep session:", error);
    res.status(500).json({ error: "Error creating sleep session." });
  }
};

const getSleepSessionsByUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ error: "Invalid user ID format." });
    return;
  }

  try {
    const sessions = await sleepSessionService.getSessionsForUser(new mongoose.Types.ObjectId(userId));
    res.status(200).json({ sessions });
  } catch (error) {
    console.error("Error fetching sleep sessions:", error);
    res.status(500).json({ error: "Error fetching sleep sessions." });
  }
};

const updateSleepSession = async (req: Request, res: Response): Promise<void> => {
  const { sessionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    res.status(400).json({ error: "Invalid session ID format." });
    return;
  }

  const { sleepDuration, sleepQuality, sleepLatency }: Partial<SleepSessionData> = req.body;

  try {
    const updatedSession = await sleepSessionService.updateSession(
      new mongoose.Types.ObjectId(sessionId),
      { sleepDuration, sleepQuality, sleepLatency }
    );

    if (!updatedSession) {
      res.status(404).json({ error: "Session not found." });
      return;
    }

    res.status(200).json({ updatedSession });
  } catch (error) {
    console.error("Error updating sleep session:", error);
    res.status(500).json({ error: "Error updating sleep session." });
  }
};

const deleteSleepSession = async (req: Request, res: Response): Promise<void> => {
  const { sessionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    res.status(400).json({ error: "Invalid session ID format." });
    return;
  }

  try {
    const deletedSession = await sleepSessionService.deleteSession(new mongoose.Types.ObjectId(sessionId));

    if (!deletedSession) {
      res.status(404).json({ error: "Session not found." });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting sleep session:", error);
    res.status(500).json({ error: "Error deleting sleep session." });
  }
};

export { createSleepSession, getSleepSessionsByUser, updateSleepSession, deleteSleepSession };
