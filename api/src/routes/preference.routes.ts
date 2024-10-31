import express from "express";
import { getAllPreferences, getOnePreference, createPreference, deletePreference, updatePreference } from "../controllers/preferenceController";
import { authMiddleware } from "../middlewares/auth-middleware";
const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllPreferences);
router.get("/:id", getOnePreference);
router.post("/", createPreference);
router.delete("/:id", deletePreference);
router.patch("/:id", updatePreference);

export default router;
