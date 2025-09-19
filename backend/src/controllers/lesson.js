import Lesson from "../models/Lesson.js";
import User from "../models/User.js";

export const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().select("_id title badge");
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    // Validate answers, award ecoPoints, return result
    // (Frontend will handle quiz logic, backend can double-check)
    res.json({ message: "Quiz submitted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const submitGame = async (req, res) => {
  try {
    // Award ecoPoints for game completion
    res.json({ message: "Game completed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
