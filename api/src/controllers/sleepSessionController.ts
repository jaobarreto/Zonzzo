import { Request, Response } from "express";
import {SleepSessionService} from "../services/sleepSessionService";

const sleepSessionService = new SleepSessionService();

const createSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const session = await sleepSessionService.createSession(req.body);
    res.status(201).json(session);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Server error", error });
    }
  }
};

const getSessionsByUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ error: "User ID is required" });
    return;
  }

  try {
    const sessions = await sleepSessionService.getSessionsByUser(userId);
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sleep sessions", error });
  }
};

const updateSession = async (req: Request, res: Response): Promise<void> => {
  const { sessionId } = req.params;

  if (!sessionId) {
    res.status(400).json({ error: "Session ID is required" });
    return;
  }

  try {
    const updatedSession = await sleepSessionService.updateSession(
      sessionId,
      req.body
    );

    if (!updatedSession) {
      res.status(404).json({ error: "Session not found" });
      return;
    }

    res.status(200).json(updatedSession);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error updating session", error });
    }
  }
};

const deleteSession = async (req: Request, res: Response): Promise<void> => {
  const { sessionId } = req.params;

  if (!sessionId) {
    res.status(400).json({ error: "Session ID is required" });
    return;
  }

  try {
    await sleepSessionService.deleteSession(sessionId);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error && error.message === "Session not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ message: "Error deleting session", error });
    }
  }
};

export { createSession, getSessionsByUser, updateSession, deleteSession };
