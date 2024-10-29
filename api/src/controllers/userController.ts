import { Request, Response } from "express";
import userService from "../services/userService";
import { ObjectId } from "mongodb";

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAll();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching users." });
  }
};

const getOneUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid ID." });
      return;
    }

    const userId = new ObjectId(id);
    const user = await userService.getOne(userId);

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching user." });
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const newUser = await userService.create(name, email, password);
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating user." });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      res.sendStatus(400);
      return;
    }

    const userId = new ObjectId(id);
    await userService.delete(userId);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting user." });
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      res.sendStatus(400);
      return;
    }

    const userId = new ObjectId(id);
    const { name, email, password } = req.body;

    const user = await userService.update(userId, name, email, password);

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export { getAllUsers, getOneUser, createUser, deleteUser, updateUser };
