import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuizzesDao(db) {
  function findQuizzesForCourse(courseId) {
    return model.find({ cid: courseId });
  }

  function createQuiz(quiz) {
    const newQuiz = { ...quiz, _id: uuidv4() };
    return model.create(newQuiz);
  }

  function updateQuiz(qid, updates) {
    return model.updateOne({ _id: qid }, { $set: updates });
  }

  function deleteQuiz(qid) {
    return model.deleteOne({ _id: qid });
  }

  function findQuizById(qid) {
    return model.findById(qid);
  }

  return {
    findQuizzesForCourse,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    findQuizById,
  };
}
