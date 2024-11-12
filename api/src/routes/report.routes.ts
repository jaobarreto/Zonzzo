import express from 'express';
import { getOneReport, getDynamicReport, deleteReport, createReport } from '../controllers/reportController';
import { authorize } from '../middlewares/auth-middleware';

const router = express.Router();

router.use(authorize);

router.get("/:id", getOneReport);
router.post("/", createReport);
router.delete("/:id", deleteReport);

router.get("/:userId/dynamic-report", getDynamicReport);

export default router;
