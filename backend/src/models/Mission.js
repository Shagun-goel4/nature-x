import mongoose from "mongoose";

const missionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  rewards: { xp: { type: Number, default: 10 }, badge: { type: String } },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  submissions: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      photoUrl: String,
      approved: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Mission", missionSchema);


