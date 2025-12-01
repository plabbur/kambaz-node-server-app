import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import model from "./model.js";


export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}

export default function EnrollmentsDao(db) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const dataFile = path.join(__dirname, "..", "Database", "enrollments.js");



  function enrollUserInCourse(userId, courseId) {
    return model.create({
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    });
  }

  function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
  }
  
  function saveToFile() {
    try {
      const content = `export default ${JSON.stringify(
        db.enrollments,
        null,
        2
      )};\n`;
      fs.writeFileSync(dataFile, content, "utf8");
    } catch (e) {
      console.error("Failed to write enrollments file:", e);
    }
  }

  // function enrollUserInCourse(userId, courseId) {
  //   const { enrollments } = db;
  //   const newE = { _id: uuidv4(), user: userId, course: courseId };
  //   enrollments.push(newE);
  //   saveToFile();
  //   return newE;
  // }

  function findEnrollmentsForUser(userId) {
    const { enrollments } = db;
    return enrollments.filter((e) => e.user === userId);
  }

  function findEnrollmentsForCourse(courseId) {
    const { enrollments } = db;
    return enrollments.filter((e) => e.course === courseId);
  }



  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  return {
    enrollUserInCourse,
    findCoursesForUser,
    findUsersForCourse,
    findEnrollmentsForUser,
    findEnrollmentsForCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
  };
}
