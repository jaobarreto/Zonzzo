import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import reportService from "../services/reportService";

interface ReportData {
  userId: string;
  sleepDurations: number[];
  sleepQualities: number[];
  energyLevels: number[];
}

interface GetReportParams {
  id: string;
}

interface ReportIdParam {
  reportId: Types.ObjectId;
}

interface UserIdParam {
  userId: string;
}

const getDynamicReport = async (req: Request<UserIdParam>, res: Response): Promise<void> => {
  const { userId } = req.params;

  if (!Types.ObjectId.isValid(userId)) {
    res.status(400).json({ error: "Invalid user ID format." });
    return;
  }

  try {
    const dynamicReport = await reportService.generateDynamicReport(new Types.ObjectId(userId));
    res.status(200).json({ dynamicReport });
  } catch (error) {
    console.error("Error generating dynamic report:", error);
    res.status(500).json({ error: "Error generating dynamic report." });
  }
};

const createReport = async (req: Request<{}, {}, ReportData>, res: Response): Promise<void> => {
  const { userId, sleepDurations, sleepQualities, energyLevels } = req.body;

  if (!Types.ObjectId.isValid(userId)) {
    res.status(400).json({ error: "Invalid user ID format." });
    return;
  }

  try {
    const report = await reportService.createReport({
      userId: new Types.ObjectId(userId),
      sleepDurations,
      sleepQualities,
      energyLevels,
    });

    res.status(201).json({ report });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ error: "Error creating report." });
  }
};

const getOneReport = async (req: Request<GetReportParams>, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
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

const deleteReport = async (req: Request<ReportIdParam>, res: Response): Promise<void> => {
  const { reportId } = req.params;

  if (!Types.ObjectId.isValid(reportId)) {
    res.status(400).json({ error: "Invalid report ID format." });
    return;
  }

  try {
    const deletedReport = await reportService.deleteReport(new Types.ObjectId(reportId));

    if (!deletedReport) {
      res.status(404).json({ error: "Report not found." });
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ error: "Error deleting report." });
  }
};

export { createReport, getOneReport, deleteReport, getDynamicReport };
