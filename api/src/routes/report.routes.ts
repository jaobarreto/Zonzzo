import express from 'express'
import {getOneReport, updateReport, deleteReport, createReport} from '../controllers/reportController'
import { authorize } from '../middlewares/auth-middleware'

const router = express.Router()

router.use(authorize)

router.get("/:id", getOneReport)
router.post("/", createReport)
router.put("/:id", updateReport)
router.delete("/:id", deleteReport)

export default router;
