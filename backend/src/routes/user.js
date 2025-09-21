import express from "express";
import { getUser, updateProgress, getDashboard } from "../controllers/user.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

import Mission from "../models/Mission.js";
import User from "../models/User.js";

// ...existing code...

// Get missions for the logged-in student
router.get("/missions", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    // Find the class the student belongs to
    const ClassModel = (await import("../models/Class.js")).default;
    const classObj = await ClassModel.findOne({ students: user._id });
    if (!classObj) return res.json([]);
    // Find missions assigned to this class
    const missions = await Mission.find({ classId: classObj._id });
    res.json(missions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/me", authMiddleware, getUser);
router.post("/progress", authMiddleware, updateProgress);
router.get("/dashboard", authMiddleware, getDashboard);

export default router;
