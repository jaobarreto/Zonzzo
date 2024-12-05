import express from "express";
import {
  createWakeSession,
  getWakeSessionsForUser,
  updateWakeSession,
  deleteWakeSession,
  getWakeSessionStats,
} from "../controllers/wakeSessionController";
import { authorize } from "../middlewares/auth-middleware";

const router = express.Router();

router.use(authorize);

router.post("/", createWakeSession);

router.get("/:userId", getWakeSessionsForUser);

router.put("/:sessionId", updateWakeSession);

router.delete("/:sessionId", deleteWakeSession);

router.get("/:userId/stats", getWakeSessionStats);

export default router;
