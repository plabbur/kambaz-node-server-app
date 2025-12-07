import QuizzesDao from "./dao.js";
export default function QuizzesRoutes(app) {
  const dao = QuizzesDao();

  app.get("/api/courses/:cid/quizzes", async (req, res) => {
    const { cid } = req.params;
    const quizzes = await dao.findQuizzesForCourse(cid);
    console.log("Found quizzes:", quizzes);
    console.log("First quiz:", quizzes[0]);
    res.json(quizzes);
  });

  app.post("/api/quizzes", async (req, res) => {
    const quiz = await dao.createQuiz(req.body);
    res.status(201).json(quiz);
  });

  app.put("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const updated = await dao.updateQuiz(qid, req.body);
    res.json(updated);
  });

  app.delete("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    console.log("DELETE request received for quiz:", qid);
    const status = await dao.deleteQuiz(qid);
    console.log("Delete status:", status);
    res.send(status);
  });

  app.get("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const quiz = await dao.findQuizById(qid);
    res.json(quiz);
  });
}
