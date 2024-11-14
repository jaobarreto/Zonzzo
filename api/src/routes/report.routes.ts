import express from 'express';
import { getWeeklyReport, getMonthlyReport, getFullReport } from '../controllers/reportController';

const router = express.Router();

router.get('/weekly/:userId', getWeeklyReport);
router.get('/monthly/:userId', getMonthlyReport);
router.get('/full/:userId', getFullReport);

export default router;
