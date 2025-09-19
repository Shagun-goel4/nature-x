import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: mongoose.Schema.Types.Mixed, // string or array or boolean
  type: String, // 'mcq', 'truefalse', 'fill', 'match', 'scenario'
});

const gameSchema = new mongoose.Schema({
  name: String,
  description: String,
  logic: String, // for frontend to render correct game
});


const pageSchema = new mongoose.Schema({
  title: String, // e.g. 'Concept', 'Examples & Action'
  content: String,
});

const lessonSchema = new mongoose.Schema({
  title: String,
  pages: [pageSchema], // [{title, content}, ...]
  quiz: [quizSchema],
  game: gameSchema,
  badge: String,
});

export default mongoose.model("Lesson", lessonSchema);
