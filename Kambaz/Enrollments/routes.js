import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const findForUser = (req, res) => {
    const { userId } = req.params;
    const items = dao.findEnrollmentsForUser(userId);
    return res.json(items);
  };

  const enroll = (req, res) => {
    const { userId, courseId } = req.body;
    dao.enrollUserInCourse(userId, courseId);
    return res.sendStatus(200);
  };

  const unenroll = (req, res) => {
    const { userId, courseId } = req.body;
    dao.unenrollUserFromCourse(userId, courseId);
    return res.sendStatus(200);
  };

  const findForCourse = (req, res) => {
    const { courseId } = req.params;
    const items = dao.findEnrollmentsForCourse(courseId);
    return res.json(items);
  };

  app.get("/api/enrollments/user/:userId", findForUser);
  app.get("/api/courses/:courseId/enrollments", findForCourse);
  app.post("/api/enrollments", enroll);
  app.delete("/api/enrollments", unenroll);
}
