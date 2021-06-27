const MainController = require("../controllers/main.controller");
const {verifyToken} = require("../middlewares/authJwt");

const route = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/loadProfile", [verifyToken], MainController.loadProfile);
  app.post("/api/loadMyCourses", [verifyToken], MainController.loadMyCourses);

};

module.exports = route;
