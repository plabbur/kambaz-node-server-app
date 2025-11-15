import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export default function AssignmentsDao(db) {
  // compute path to database assignments file (Kambaz/Database/assignments.js)
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const dataFile = path.join(__dirname, "..", "Database", "assignments.js");

  function saveToFile() {
    try {
      const content = `export default ${JSON.stringify(db.assignments, null, 2)};\n`;
      fs.writeFileSync(dataFile, content, "utf8");
    } catch (e) {
      console.error("Failed to write assignments file:", e);
    }
  }

  function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    saveToFile();
    return newAssignment;
  }

  function findAssignmentsForCourse(courseId) {
    const { assignments } = db;
    return assignments.filter((a) => a.course === courseId);
  }

  function deleteAssignment(assignmentId) {
    const { assignments } = db;
    db.assignments = assignments.filter((a) => a._id !== assignmentId);
    saveToFile();
  }

  function updateAssignment(assignmentId, updates) {
    const { assignments } = db;
    const a = assignments.find((it) => it._id === assignmentId);
    if (!a) return null;
    Object.assign(a, updates);
    saveToFile();
    return a;
  }

  return {
    createAssignment,
    findAssignmentsForCourse,
    deleteAssignment,
    updateAssignment,
  };
}
