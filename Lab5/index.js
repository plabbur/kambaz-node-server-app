import PathParamters from "./PathParameters.js";
import QueryParameters from "./QueryParameters.js";
import WorkingWithObjects from "./WorkingWithObjects.js";
import WorkintWithArrays from "./WorkingWithArrays.js";
export default function Lab5(app) {
  app.get("/lab5/welcome", (req, res) => {
    res.send("Welcome to Lab 5");
  });
  PathParamters(app);
  QueryParameters(app);
  WorkingWithObjects(app);
  WorkintWithArrays(app);
}
