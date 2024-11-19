import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./config/db-connection";
import userRoutes from "./routes/user.routes";
import preferenceRoutes from "./routes/preference.routes";
import authRoutes from './routes/authenticate.routes'
import reportRoutes from './routes/report.routes'
import sleepRoutes from './routes/sleepSession.routes'
import moodRoutes from './routes/dailyMood.routes'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Zonzzo!");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/preferences", preferenceRoutes);
app.use("/api/sleep", sleepRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/report", reportRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found." });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Unexpected error:", error.message);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
