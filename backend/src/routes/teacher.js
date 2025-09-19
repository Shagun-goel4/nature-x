import express from "express";
import User from "../models/User.js";
import ClassModel from "../models/Class.js";
import ModuleModel from "../models/Module.js";
import MissionModel from "../models/Mission.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Ensure teacher role
router.use(authMiddleware);
router.use(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "teacher") return res.status(403).json({ message: "Forbidden" });
    req.teacher = user;
    next();
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Dashboard snapshot
router.get("/dashboard", async (req, res) => {
  const classes = await ClassModel.find({ teacher: req.teacher._id }).populate("students");
  const classIds = classes.map((c) => c._id);
  const modules = await ModuleModel.find({ createdBy: req.teacher._id });
  const missions = await MissionModel.find({ createdBy: req.teacher._id });
  const students = classes.flatMap((c) => c.students);
  const avgXP = students.length ? Math.round(students.reduce((s, u) => s + (u.ecoPoints || 0), 0) / students.length) : 0;
  const leaderboard = students
    .map((s) => ({ username: s.username, ecoPoints: s.ecoPoints }))
    .sort((a, b) => b.ecoPoints - a.ecoPoints)
    .slice(0, 10);
  res.json({
    classes: classes.map((c) => ({ id: c._id, name: c.name, students: c.students.length })),
    summary: { avgXP, modules: modules.length, missions: missions.length },
    leaderboard,
  });
});

// Content management
router.post("/modules", async (req, res) => {
  const mod = await ModuleModel.create({ ...req.body, createdBy: req.teacher._id });
  res.status(201).json(mod);
});
router.get("/modules", async (req, res) => {
  const mods = await ModuleModel.find({ createdBy: req.teacher._id });
  res.json(mods);
});
router.post("/modules/:id/assign", async (req, res) => {
  const { classId } = req.body;
  const mod = await ModuleModel.findByIdAndUpdate(req.params.id, { $addToSet: { assignedTo: classId } }, { new: true });
  res.json(mod);
});

// Missions
router.post("/missions", async (req, res) => {
  const mission = await MissionModel.create({ ...req.body, createdBy: req.teacher._id });
  res.status(201).json(mission);
});
router.get("/missions", async (req, res) => {
  const list = await MissionModel.find({ createdBy: req.teacher._id });
  res.json(list);
});
router.post("/missions/:id/approve", async (req, res) => {
  const { submissionId } = req.body;
  const mission = await MissionModel.findById(req.params.id);
  const sub = mission.submissions.id(submissionId);
  if (!sub) return res.status(404).json({ message: "Not found" });
  sub.approved = true;
  await mission.save();
  // reward student
  await User.findByIdAndUpdate(sub.student, { $inc: { ecoPoints: mission.rewards?.xp || 10 }, $addToSet: { badges: mission.rewards?.badge } });
  res.json({ ok: true });
});

export default router;


