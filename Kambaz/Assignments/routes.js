import AssignmentsDao from "../Assignments/dao.js";
export default function AssignmentsRoutes(app) {
  const dao = AssignmentsDao();

  app.get("/api/courses/:cid/assignments", async (req, res) => {
    const { cid } = req.params;
    const assignments = await dao.findAssignmentsForCourse(cid);
    console.log("Found assignments:", assignments);
    console.log("First assignment:", assignments[0]);
    res.json(assignments);
  });

  app.post("/api/assignments", async (req, res) => {
    const assignment = await dao.createAssignment(req.body);
    res.status(201).json(assignment);
  });

  app.put("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    const updated = await dao.updateAssignment(aid, req.body);
    res.json(updated);
  });

  app.delete("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    console.log("DELETE request received for assignment:", aid);
    const status = await dao.deleteAssignment(aid);
    console.log("Delete status:", status);
    res.send(status);
  });
}
