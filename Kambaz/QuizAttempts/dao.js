import QuizAttemptModel from "./model.js";

export function findAttemptsForQuiz(quizId) {
  return QuizAttemptModel.find({ quiz: quizId });
}

export function findAttemptsForUserAndQuiz(userId, quizId) {
  return QuizAttemptModel.find({ user: userId, quiz: quizId }).sort({ attempt_number: -1 });
}

export function findLatestAttemptForUserAndQuiz(userId, quizId) {
  return QuizAttemptModel.findOne({ user: userId, quiz: quizId }).sort({ attempt_number: -1 });
}

export function countAttemptsForUserAndQuiz(userId, quizId) {
  return QuizAttemptModel.countDocuments({ user: userId, quiz: quizId });
}

export function createAttempt(attempt) {
  return QuizAttemptModel.create(attempt);
}

export function updateAttempt(attemptId, updates) {
  return QuizAttemptModel.updateOne({ _id: attemptId }, { $set: updates });
}

export function deleteAttempt(attemptId) {
  return QuizAttemptModel.deleteOne({ _id: attemptId });
}

export function findAttemptById(attemptId) {
  return QuizAttemptModel.findOne({ _id: attemptId });
}
