import express from "express";
import {
  getLessons,
  getLesson,
  submitQuiz,
  submitGame,
} from "../controllers/lesson.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.get("/", authMiddleware, getLessons);
router.get("/:id", authMiddleware, getLesson);
router.post("/:id/quiz", authMiddleware, submitQuiz);
router.post("/:id/game", authMiddleware, submitGame);

export default router;
