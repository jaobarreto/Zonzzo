import { Request, Response } from "express";
import mongoose from "mongoose";
import reportService from "../services/reportService";

interface ReportData {
  userId: string;
  sleepDurations: number[];
  sleepQualities: number[];
}

const createReport = async (req: Request, res: Response): Promise<void> => {
  const { userId, sleepDurations, sleepQualities }: ReportData = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ error: "Invalid user ID format." });
    return;
  }

  try {
    const report = await reportService.createReport({
      userId: new mongoose.Types.ObjectId(userId),
      sleepDurations,
      sleepQualities,
    });

    res.status(201).json({ report });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ error: "Error creating report." });
  }
};

const getOneReport = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid ID format." });
    return;
  }

  try {
    const report = await reportService.getOne(id);

    if (!report) {
      res.status(404).json({ error: "Report not found." });
      return;
    }

    res.status(200).json({ report });
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ error: "Error fetching report." });
  }
};

const updateReport = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ error: "Invalid user ID format." });
    return;
  }

  const {
    sleepDurations,
    sleepQualities,
  }: Partial<Pick<ReportData, "sleepDurations" | "sleepQualities">> = req.body;

  const updateData = { sleepDurations, sleepQualities };

  try {
    const updatedReport = await reportService.updateReport(
      new mongoose.Types.ObjectId(userId),
      updateData
    );

    if (!updatedReport) {
      res.status(404).json({ error: "Report not found for this user." });
      return;
    }

    res.status(200).json({ report: updatedReport });
  } catch (error) {
    console.error("Error updating report:", error);
    res.status(500).json({ error: "Error updating report." });
  }
};

const deleteReport = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ error: "Invalid user ID format." });
    return;
  }

  try {
    const deletedReport = await reportService.deleteReport(
      new mongoose.Types.ObjectId(userId)
    );

    if (!deletedReport) {
      res.status(404).json({ error: "Report not found for this user." });
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ error: "Error deleting report." });
  }
};

export { createReport, getOneReport, updateReport, deleteReport };
