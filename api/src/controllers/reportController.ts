import { Request, Response } from 'express';
import ReportService from '../services/reportService';

const reportService = new ReportService();

// Função para gerar o relatório semanal
export const getWeeklyReport = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const weeklyReport = await reportService.generateWeeklyReport(userId);
    res.status(200).json(weeklyReport);
  } catch (error) {
    res.status(500).json({ error: `Error generating weekly report: ${error}` });
  }
};

// Função para gerar o relatório mensal
export const getMonthlyReport = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const monthlyReport = await reportService.generateMonthlyReport(userId);
    res.status(200).json(monthlyReport);
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};

// Função para exibir um relatório completo com dados semanais e mensais
export const getFullReport = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const weeklyReport = await reportService.generateWeeklyReport(userId);
    const monthlyReport = await reportService.generateMonthlyReport(userId);

    const fullReport = {
      weeklyReport,
      monthlyReport,
    };

    res.status(200).json(fullReport);
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};
