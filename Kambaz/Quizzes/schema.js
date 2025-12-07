import mongoose from "mongoose";

const quizzesSchema = new mongoose.Schema(
  {
    _id: String,
    cid: { type: String, required: true },
    title: { type: String, required: true },
    instructions: { type: String, default: "" },
    type: {
      type: String,
      enum: [
        "GRADED_QUIZ",
        "PRACTICE_QUIZ",
        "GRADED_SURVEY",
        "UNGRADED_SURVEY",
      ],
      default: "GRADED_QUIZ",
    },
    points: { type: Number, default: 0 },
    assignment_ground: {
      type: String,
      enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
      default: "QUIZZES",
    },
    shuffle_answers: { type: Boolean, default: false },
    time_limit: { type: Number, default: 20 },
    multiple_attempts: { type: Boolean, default: false },
    how_many_attempts: Number,
    show_correct_answers: { type: Boolean, default: false },
    access_code: { type: String, default: "" },
    one_question_at_a_time: { type: Boolean, default: true },
    lock_questions_after_answering: { type: Boolean, default: false },
    due_date: Date,
    available_date: Date,
    until_date: Date,
    questions: { type: Array, default: [] },
    published: { type: Boolean, default: false },
  },
  { collection: "quizzes" }
);

export default quizzesSchema;
