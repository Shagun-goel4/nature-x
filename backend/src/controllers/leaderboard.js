import User from "../models/User.js";

export const getLeaderboard = async (req, res) => {
  try {
    const top = await User.find()
      .sort({ ecoPoints: -1 })
      .limit(10)
      .select("username ecoPoints school");
    res.json(top);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
