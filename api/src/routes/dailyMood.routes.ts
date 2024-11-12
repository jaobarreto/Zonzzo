import express from "express";
import {
  createMood,
  getMoodsForUser,
  updateMood,
  deleteMood,
  getMoodStats,
} from "../controllers/dailyMoodController";
import { authorize } from "../middlewares/auth-middleware";

const router = express.Router();

router.use(authorize);

router.post("/", createMood);
router.get("/:userId", getMoodsForUser);
router.put("/:moodId", updateMood);
router.delete("/:moodId", deleteMood);
router.get("/:userId/stats", getMoodStats);

export default router;
