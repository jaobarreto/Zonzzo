import { Request, Response } from "express";
import SleepSessionService from "../services/sleepSessionService";

const sleepSessionService = new SleepSessionService();

const createSession = async (req: Request, res: Response) => {
  try {
    const session = await sleepSessionService.createSession(req.body);
    res.status(201).json(session);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error', error });
    }
  }
};

const getSessionsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const sessions = await sleepSessionService.getSessionsByUser(userId);
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const updatedSession = await sleepSessionService.updateSession(
      sessionId,
      req.body
    );
    res.status(200).json(updatedSession);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    await sleepSessionService.deleteSession(sessionId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export { createSession, getSessionsByUser, updateSession, deleteSession };
