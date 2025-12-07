import UsersDao from "./dao.js";

export default function UserRoutes(app) {
  const dao = UsersDao();
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };
  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };
  app.get("/api/users", findAllUsers);
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
    }
    res.json(currentUser);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    console.log("Signin attempt for username:", username);
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      console.log("User found, setting session. Session ID:", req.sessionID);
      req.session["currentUser"] = currentUser;
      console.log("Session after setting user:", req.session);
      res.json(currentUser);
    } else {
      console.log("Invalid credentials");
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  // const profile = (req, res) => {
  //   console.log("Profile endpoint hit");
  //   console.log("Session ID:", req.sessionID);
  //   console.log("Session data:", req.session);
  //   console.log("Current user in session:", req.session["currentUser"]);

  //   const currentUser = req.session["currentUser"];
  //   if (!currentUser) {
  //     console.log("No current user found, sending 401");
  //     res.sendStatus(401);
  //     return;
  //   }
  //   console.log("Returning user:", currentUser);
  //   res.json(currentUser);
  // };
  const profile = (req, res) => {
    console.log("=== PROFILE ENDPOINT ===");
    console.log("Session ID:", req.sessionID);
    console.log("Session exists:", !!req.session);
    console.log("Current user exists:", !!req.session["currentUser"]);
    console.log("Current user data:", req.session["currentUser"]);
    console.log("========================");

    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }
    res.json(currentUser);
  };

  app.get("/api/users/profile", profile);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  // app.get("/api/users/profile", (req, res) => {
  //   console.log("Profile endpoint - Session:", req.session);
  //   console.log("Profile endpoint - User:", req.session.user);

  //   if (req.session.user) {
  //     res.json(req.session.user);
  //   } else {
  //     res.status(401).json({ message: "Not authenticated" });
  //   }
  // });
}
