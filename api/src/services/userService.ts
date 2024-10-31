import User, { IUser } from "../models/User";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

class UserService {
  async getAll() {
    try {
      const users = await User.find().populate("preferences");
      return users;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching users.");
    }
  }

  async getOne(id: ObjectId) {
    try {
      const user = await User.findById(id).populate("preferences");
      if (!user) {
        throw new Error("User not found.");
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching user.");
    }
  }

  async create(name: string, email: string, password: string) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      return newUser;
    } catch (error) {
      console.log(error);
      throw new Error("Error creating user.");
    }
  }

  async delete(id: ObjectId) {
    try {
      await User.findByIdAndDelete(id);
      console.log(`User with id:${id} has been deleted.`);
    } catch (error) {
      throw new Error("Error deleting user.");
    }
  }

  async update(id: ObjectId, name: string, email: string, password: string) {
    try {
      const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, ...(hashedPassword ? { password: hashedPassword } : {}) },
        { new: true }
      );

      if (updatedUser) {
        console.log(`User data with id:${id} successfully updated.`);
        return updatedUser;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error updating user.");
    }
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await User.findOne({ email }).populate("preferences");
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching user by email.");
    }
  }
}

export default new UserService();
