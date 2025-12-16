import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import model from "./model.js";

export default function EnrollmentsDao(db) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const dataFile = path.join(__dirname, "..", "Database", "enrollments.js");

  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments
      .map((enrollment) => enrollment.course)
      .filter((course) => course !== null);
  }

  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments
      .map((enrollment) => enrollment.user)
      .filter((user) => user !== null);
  }

  async function enrollUserInCourse(userId, courseId) {
    // Check if already enrolled
    const existing = await model.findOne({ user: userId, course: courseId });
    if (existing) {
      return existing;
    }
    return model.create({
      user: userId,
      course: courseId,
      _id: uuidv4(),
    });
  }

  function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
  }

  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  return {
    enrollUserInCourse,
    findCoursesForUser,
    findUsersForCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
  };
}
