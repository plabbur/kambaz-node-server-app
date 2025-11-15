import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app, db) {
  const dao = AssignmentsDao(db);

  const findAssignmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.findAssignmentsForCourse(courseId);
    return res.json(assignments);
  };

  const createAssignment = (req, res) => {
    const assignment = req.body;
    const created = dao.createAssignment(assignment);
    return res.json(created);
  };

  const deleteAssignment = (req, res) => {
    const { aid } = req.params;
    dao.deleteAssignment(aid);
    return res.sendStatus(200);
  };

  const updateAssignment = (req, res) => {
    const { aid } = req.params;
    const updates = req.body;
    const updated = dao.updateAssignment(aid, updates);
    return res.json(updated);
  };

  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/assignments", createAssignment);
  app.delete("/api/assignments/:aid", deleteAssignment);
  app.put("/api/assignments/:aid", updateAssignment);
}
