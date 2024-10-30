import { Request, Response } from "express";
import preferenceService from "../services/preferenceService";
import { ObjectId } from "mongodb";

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
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid ID." });
      return;
    }

    const preferenceId = new ObjectId(id);
    const preference = await preferenceService.getOne(preferenceId);

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
  try {
    const { userId, sleepDuration, sleepStartTime, sleepEndTime, sleepMusic, alarmMusic, alarmDays } = req.body;

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
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      res.sendStatus(400);
      return;
    }

    const preferenceId = new ObjectId(id);
    await preferenceService.delete(preferenceId);

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting preference:", error);
    res.status(500).json({ error: "Error deleting preference." });
  }
};

const updatePreference = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!ObjectId.isValid(userId)) {
      res.sendStatus(400);
      return;
    }

    const updateData = req.body;

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
