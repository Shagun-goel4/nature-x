import express from "express";
import { getUser, updateProgress, getDashboard } from "../controllers/user.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.get("/me", authMiddleware, getUser);
router.post("/progress", authMiddleware, updateProgress);
router.get("/dashboard", authMiddleware, getDashboard);

export default router;
