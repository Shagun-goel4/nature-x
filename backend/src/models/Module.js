import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["lesson", "quiz", "video"], required: true },
  difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" },
  theme: { type: String, enum: ["waste", "energy", "water", "biodiversity"], required: true },
  content: { type: Object, default: {} },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Module", moduleSchema);


