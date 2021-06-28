const ManageController = require("../controllers/manage.controller");
const {verifyToken} = require("../middlewares/authJwt");
const {checkDuplicateUsernameOrEmail, confirmPassword, validateInput} = require("../middlewares/verifySignUp");


const route = (app) => {
  app.post("/api/createAccount", [verifyToken, checkDuplicateUsernameOrEmail, confirmPassword, validateInput], ManageController.createAccount);
  app.post("/api/updateAccount", [verifyToken, validateInput], ManageController.updateAccount);
  app.post("/api/deleteAccount", [verifyToken], ManageController.deleteAccount);

  app.post("/api/updateCourse", [verifyToken], ManageController.updateCourse);
  app.post("/api/deleteCourse", [verifyToken], ManageController.deleteCourse);
  app.post("/api/createCourse", [verifyToken], ManageController.createCourse);
  app.post("/api/assignCourse", [verifyToken], ManageController.assignCourse);

  app.post("/api/loadCourses", [verifyToken], ManageController.loadCourses);
  app.post("/api/loadAccounts", [verifyToken], ManageController.loadAccounts);

  app.post("/api/createRole", [verifyToken], ManageController.createRole);
  app.post("/api/updateRole", [verifyToken], ManageController.updateRole);
  app.post("/api/deleteRole", [verifyToken], ManageController.deleteRole);

  app.post("/api/createEduLevel", [verifyToken], ManageController.createEduLevel);
  app.post("/api/updateEduLevel", [verifyToken], ManageController.updateEduLevel);
  app.post("/api/deleteEduLevel", [verifyToken], ManageController.deleteEduLevel);

  app.post("/api/loadCategories", [verifyToken], ManageController.loadCategories);
  app.post("/api/createCategory", [verifyToken], ManageController.createCategory);
  app.post("/api/updateCategory", [verifyToken], ManageController.updateCategory);
  app.post("/api/deleteCategory", [verifyToken], ManageController.deleteCategory);

  app.post("/api/createActivityCourse", [verifyToken], ManageController.createActivityCourse);
  app.post("/api/loadCourseActivities", [verifyToken], ManageController.loadCourseActivities);
  app.post("/api/createMaterialCourse", [verifyToken], ManageController.createMaterialCourse);
};

module.exports = route;
