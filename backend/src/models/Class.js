import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("Class", classSchema);


