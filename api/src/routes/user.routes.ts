import express from "express";
import { getAllUsers, getOneUser, createUser, deleteUser, updateUser } from "../controllers/userController";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;
