import express from "express";
import dotenv from "dotenv";
import mongoose from "./config/db-connection";
import userRoutes from "./routes/user.routes";
import preferenceRoutes from "./routes/preference.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Zonzzo!");
});

app.use("/api/users", userRoutes);
app.use("/api/preferences", preferenceRoutes);

mongoose.connection
  .once("open", () => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .on("error", (error) => {
    console.error("Error connecting to MongoDB:", error);
  });
