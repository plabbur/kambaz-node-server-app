import * as dao from "./dao.js";
import { v4 as uuidv4 } from "uuid";

export default function QuizAttemptsRoutes(app) {
  // Get all attempts for a quiz
  app.get("/api/quizzes/:qid/attempts", async (req, res) => {
    const { qid } = req.params;
    const attempts = await dao.findAttemptsForQuiz(qid);
    res.json(attempts);
  });

  // Get all attempts for a user and quiz
  app.get("/api/quizzes/:qid/attempts/user/:uid", async (req, res) => {
    const { qid, uid } = req.params;
    const attempts = await dao.findAttemptsForUserAndQuiz(uid, qid);
    res.json(attempts);
  });

  // Get latest attempt for a user and quiz
  app.get("/api/quizzes/:qid/attempts/user/:uid/latest", async (req, res) => {
    const { qid, uid } = req.params;
    const attempt = await dao.findLatestAttemptForUserAndQuiz(uid, qid);
    res.json(attempt);
  });

  // Count attempts for a user and quiz
  app.get("/api/quizzes/:qid/attempts/user/:uid/count", async (req, res) => {
    const { qid, uid } = req.params;
    const count = await dao.countAttemptsForUserAndQuiz(uid, qid);
    res.json({ count });
  });

  // Create a new attempt
  app.post("/api/quizzes/:qid/attempts", async (req, res) => {
    const { qid } = req.params;
    const attempt = {
      ...req.body,
      _id: uuidv4(),
      quiz: qid,
    };
    const newAttempt = await dao.createAttempt(attempt);
    res.json(newAttempt);
  });

  // Update an attempt
  app.put("/api/attempts/:aid", async (req, res) => {
    const { aid } = req.params;
    const status = await dao.updateAttempt(aid, req.body);
    res.json(status);
  });

  // Delete an attempt
  app.delete("/api/attempts/:aid", async (req, res) => {
    const { aid } = req.params;
    const status = await dao.deleteAttempt(aid);
    res.json(status);
  });

  // Get attempt by ID
  app.get("/api/attempts/:aid", async (req, res) => {
    const { aid } = req.params;
    const attempt = await dao.findAttemptById(aid);
    res.json(attempt);
  });
}
