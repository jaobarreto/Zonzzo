import express from "express";
import {
  createPreference,
  getAllPreferences,
  getPreferenceByUserId,
  updatePreference,
  deletePreference,
} from "../controllers/preferenceController";
import { authorize } from "../middlewares/auth-middleware";

const router = express.Router();

router.use(authorize);

router.post("/", createPreference);
router.get("/", getAllPreferences);
router.get("/:userId", getPreferenceByUserId);
router.put("/:userId", updatePreference);
router.delete("/:userId", deletePreference);

export default router;
