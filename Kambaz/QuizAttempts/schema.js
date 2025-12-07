import mongoose from "mongoose";

const quizAttemptsSchema = new mongoose.Schema(
  {
    _id: String,
    quiz: { type: String, required: true },
    user: { type: String, required: true },
    attempt_number: { type: Number, required: true },
    answers: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} },
    score: { type: Number, default: 0 },
    submitted_at: { type: Date, default: Date.now },
  },
  { collection: "quiz_attempts" }
);

export default quizAttemptsSchema;
