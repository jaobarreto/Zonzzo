import express from 'express';
import {
  createSleepSession,
  getSleepSessionsByUser,
  updateSleepSession,
  deleteSleepSession
} from '../controllers/sleepSessionController';
import { authorize } from '../middlewares/auth-middleware';

const router = express.Router();

router.use(authorize);

router.post("/", createSleepSession);
router.get("/:userId", getSleepSessionsByUser);
router.put("/:sessionId", updateSleepSession);
router.delete("/:sessionId", deleteSleepSession);

export default router;
