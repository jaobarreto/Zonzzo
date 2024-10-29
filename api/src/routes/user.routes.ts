import express from "express";
import {  getAllUsers,  getOneUser,  createUser,  deleteUser,  updateUser} from "../controllers/userController";

const router = express.Router();

router.get("/users", getAllUsers);

router.get("/users/:id", getOneUser);

router.post("/users", createUser);

router.delete("/users/:id", deleteUser);

router.put("/users/:id", updateUser);

export default router;
