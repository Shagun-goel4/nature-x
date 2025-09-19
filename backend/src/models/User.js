import mongoose from "mongoose";

const badgeList = [
  "Waste Wizard",
  "Water Warrior",
  "Energy Hero",
  "Climate Champion",
  "Biodiversity Guardian",
];

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },
  ecoPoints: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
  progress: {
    type: Map,
    of: Boolean, // lessonId: true/false
    default: {},
  },
  school: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
