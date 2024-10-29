import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
    }
};

const connection = mongoose.connection;

connection.on("error", () => {
    console.log("Error connecting to MongoDB Atlas.");
});

connection.on("open", () => {
    console.log("Successfully connected to MongoDB Atlas.");
});

connect();

export default mongoose;
