const ManageController = require("../controllers/manage.controller");
const {verifyToken} = require("../middlewares/authJwt");
const {checkDuplicateUsernameOrEmail, confirmPassword, validateInput} = require("../middlewares/verifySignUp");


const route = (app) => {
  app.post("/api/createAccount", [verifyToken, checkDuplicateUsernameOrEmail, confirmPassword, validateInput], ManageController.createAccount);
  app.post("/api/updateAccount", [verifyToken], ManageController.updateAccount);
  app.post("/api/deleteAccount", [verifyToken], ManageController.deleteAccount);

  app.post("/api/updateCourse", [verifyToken], ManageController.updateCourse);
  app.post("/api/createCourse", [verifyToken], ManageController.createCourse);

  app.post("/api/loadCourses", [verifyToken], ManageController.loadCourses);
  app.post("/api/loadAccounts", [verifyToken], ManageController.loadAccounts);

  app.post("/api/createRole", [verifyToken], ManageController.createRole);
  app.post("/api/updateRole", [verifyToken], ManageController.updateRole);
  app.post("/api/deleteRole", [verifyToken], ManageController.deleteRole);

  app.post("/api/createEduLevel", [verifyToken], ManageController.createEduLevel);
  app.post("/api/updateEduLevel", [verifyToken], ManageController.updateEduLevel);
  app.post("/api/deleteEduLevel", [verifyToken], ManageController.deleteEduLevel);
};

module.exports = route;
