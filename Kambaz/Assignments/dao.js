import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId });
  }

  function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    return model.create(newAssignment);
  }

  function updateAssignment(aid, updates) {
    return model.updateOne({ _id: aid }, { $set: updates });
  }

  function deleteAssignment(aid) {
    return model.deleteOne({ _id: aid });
  }

  function findAssignmentById(aid) {
    return model.findById(aid);
  }

  return {
    findAssignmentsForCourse,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    findAssignmentById,
  };
}
