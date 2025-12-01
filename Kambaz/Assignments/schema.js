import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    availableDate: Date,
    availableUntilDate: Date,
    course: { type: String, ref: "CourseModel" },
    points: Number,
  },
  { collection: "assignments" }
);

export default assignmentSchema;
