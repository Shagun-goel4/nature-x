import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import lessonRoutes from "./routes/lesson.js";
import leaderboardRoutes from "./routes/leaderboard.js";
import teacherRoutes from "./routes/teacher.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/teacher", teacherRoutes);

const PORT = process.env.PORT || 5050;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
