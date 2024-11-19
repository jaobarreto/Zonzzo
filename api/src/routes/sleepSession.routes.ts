import express from 'express';
import { createSession, getSessionsByUser, updateSession, deleteSession } from '../controllers/sleepSessionController';
import { authorize } from '../middlewares/auth-middleware';

const router = express.Router();

router.use(authorize);

router.post("/", createSession);
router.get("/:userId", getSessionsByUser);
router.put("/:sessionId", updateSession);
router.delete("/:sessionId", deleteSession);

export default router;
