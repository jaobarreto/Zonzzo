import { Request, Response } from 'express';
import ReportService from '../services/reportService';

const reportService = new ReportService();

export const getWeeklyReport = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const report = await reportService.generateReport(userId, 'weekly');
    res.status(200).json(report);
  } catch (error) {
    console.error("Erro ao gerar relatório semanal:", error);
    res.status(500).json({ message: 'Erro ao gerar relatório semanal', error });
  }
};

export const getMonthlyReport = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const report = await reportService.generateReport(userId, 'monthly');
    res.status(200).json(report);
  } catch (error) {
    console.error("Erro ao gerar relatório mensal:", error);
    res.status(500).json({ message: 'Erro ao gerar relatório mensal', error });
  }
};

export const getFullReport = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const weeklyReport = await reportService.generateReport(userId, 'weekly');
    const monthlyReport = await reportService.generateReport(userId, 'monthly');

    res.status(200).json({ weeklyReport, monthlyReport });
  } catch (error) {
    console.error("Erro ao gerar relatório completo:", error);
    res.status(500).json({ message: 'Erro ao gerar relatório completo', error });
  }
};
