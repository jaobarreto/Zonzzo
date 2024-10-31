import mongoose from "mongoose";
import User, { IUser } from "../models/User";
import Preference from "../models/Preferences";

export interface UserData {
  name: string;
  email: string;
  password: string;
  preferences?: mongoose.Types.ObjectId[];
}

class UserService {
  async getAll(): Promise<IUser[]> {
    try {
      const users = await User.find().populate("preferences");
      return users as IUser[];
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Error fetching users.");
    }
  }

  async getOne(id: string): Promise<IUser> {
    try {
      const user = await User.findById(id).populate("preferences");
      if (!user) {
        throw new Error("Usuário não encontrado.");
      }
      return user as IUser;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar usuário.");
    }
  }

  async create(data: UserData): Promise<IUser> {
    try {
      const newUser = await User.create(data);
      return newUser as IUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Error creating user.");
    }
  }

  async delete(id: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format.");
    }

    try {
      await Preference.deleteMany({ userId: id });

      const result = await User.findByIdAndDelete(id);
      if (!result) throw new Error("User not found.");
      console.log(`User with id:${id} has been deleted.`);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Error deleting user.");
    }
  }

  async update(id: string, updateData: Partial<UserData>): Promise<IUser> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user ID format.");
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!updatedUser) throw new Error("User not found.");
      return updatedUser as IUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Error updating user.");
    }
  }
}

export default new UserService();
