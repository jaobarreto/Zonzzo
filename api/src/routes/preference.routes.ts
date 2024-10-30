import express from "express";
import { getAllPreferences, getOnePreference, createPreference, deletePreference, updatePreference } from "../controllers/preferenceController";

const router = express.Router();

router.get("/", getAllPreferences);
router.get("/:id", getOnePreference);
router.post("/", createPreference);
router.delete("/:id", deletePreference);
router.put("/:userId", updatePreference);

export default router;
