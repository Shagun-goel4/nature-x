import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const { lessonId, completed, ecoPoints, badge } = req.body;
    const user = await User.findById(req.userId);
    if (lessonId) user.progress.set(lessonId, completed);
    if (ecoPoints) user.ecoPoints += ecoPoints;
    if (badge && !user.badges.includes(badge)) user.badges.push(badge);
    await user.save();
    res.json({ message: "Progress updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json({
      ecoPoints: user.ecoPoints,
      badges: user.badges,
      progress: user.progress,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
