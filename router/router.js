const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");
const authController = require("../controller/authController.js");
const userController = require("../controller/userController.js");


module.exports = function(app) {
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUserNameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authController.signup
  );
  app.post("/api/auth/signin", authController.signin);
  app.get("/api/users", [authJwt.verifyToken], userController.users);

  app.get("/api/test/user", [authJwt.verifyToken], userController.userContent);
  app.get("/api/test/pm", [authJwt.verifyToken, authJwt.isPmOrAdmin], userController.managementBoard);
  app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], userController.adminBoard);

  app.use(function(req, res, next) {
    return res.status(404).send({
      status: 404,
      message: "Not Found"
    });
  });

  app.use(function(err, req, res, next) {
    return res.status(500).send({
      error: err
    });
  });
};