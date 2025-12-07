import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  app.get("/api/enrollments/user/:userId", async (req, res) => {
    const { userId } = req.params;
    const items = await dao.findCoursesForUser(userId);
    return res.json(items);
  });

  app.get("/api/courses/:courseId/enrollments", async (req, res) => {
    const { courseId } = req.params;
    const items = await dao.findUsersForCourse(courseId);
    return res.json(items);
  });

  app.post("/api/enrollments", async (req, res) => {
    const { userId, courseId } = req.body;
    try {
      const result = await dao.enrollUserInCourse(userId, courseId);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error enrolling user:", error);
      return res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/enrollments", async (req, res) => {
    const { userId, courseId } = req.body;
    const result = await dao.unenrollUserFromCourse(userId, courseId);
    return res.status(200).json(result);
  });
}
