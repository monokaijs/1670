const ManageController = require("../controllers/manage.controller");
const {verifyToken} = require("../middlewares/authJwt");
const {checkDuplicateUsernameOrEmail, confirmPassword, validateInput} = require("../middlewares/verifySignUp");


const route = (app) => {
  app.post("/api/createAccount", [verifyToken, checkDuplicateUsernameOrEmail, confirmPassword, validateInput], ManageController.createAccount);
  app.post("/api/updateAccount", [verifyToken], ManageController.updateAccount);

  app.post("/api/updateCourse", [verifyToken], ManageController.updateCourse);
  app.post("/api/createCourse", [verifyToken], ManageController.createCourse);

  app.post("/api/loadCourses", [verifyToken], ManageController.updateAccount);
  app.post("/api/loadAccounts", [verifyToken], ManageController.updateAccount);
};

module.exports = route;
