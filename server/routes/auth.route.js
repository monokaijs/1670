const AuthController = require("../controllers/auth.controller");

const route = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/auth/login", AuthController.login);
  app.post("/auth/signup", AuthController.signup);
};

module.exports = route;
