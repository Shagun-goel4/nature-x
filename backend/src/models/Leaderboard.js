import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ecoPoints: Number,
  school: String,
});

export default mongoose.model("Leaderboard", leaderboardSchema);
