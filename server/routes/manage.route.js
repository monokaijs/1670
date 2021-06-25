const ManageController = require("../controllers/manage.controller");
const {verifyToken} = require("../middlewares/authJwt");

const route = (app) => {
  app.post("/api/createAccount", [verifyToken], ManageController.createAccount);
  app.post("/api/updateAccount", [verifyToken], ManageController.updateAccount);

  app.post("/api/updateCourse", [verifyToken], ManageController.updateCourse);
  app.post("/api/createCourse", [verifyToken], ManageController.createCourse);

  app.post("/api/loadCourses", [verifyToken], ManageController.updateAccount);
  app.post("/api/loadAccounts", [verifyToken], ManageController.updateAccount);
};

module.exports = route;
