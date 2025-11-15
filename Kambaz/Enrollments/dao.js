import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
export default function EnrollmentsDao(db) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const dataFile = path.join(__dirname, "..", "Database", "enrollments.js");

  function saveToFile() {
    try {
      const content = `export default ${JSON.stringify(db.enrollments, null, 2)};\n`;
      fs.writeFileSync(dataFile, content, "utf8");
    } catch (e) {
      console.error("Failed to write enrollments file:", e);
    }
  }
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
  const newE = { _id: uuidv4(), user: userId, course: courseId };
  enrollments.push(newE);
  saveToFile();
  return newE;
  }

  function findEnrollmentsForUser(userId) {
    const { enrollments } = db;
    return enrollments.filter((e) => e.user === userId);
  }

  function findEnrollmentsForCourse(courseId) {
    const { enrollments } = db;
    return enrollments.filter((e) => e.course === courseId);
  }

  function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = db;
  db.enrollments = enrollments.filter((e) => !(e.user === userId && e.course === courseId));
  saveToFile();
  }
  return { enrollUserInCourse, findEnrollmentsForUser, findEnrollmentsForCourse, unenrollUserFromCourse };
}
