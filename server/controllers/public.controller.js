const Account = require("../models/account.model");
const Role = require("../models/role.model");
const EduLevel = require("../models/edulevel.model");
const CourseCategory = require("../models/courseCategory.model");

const PublicController = {
  loadConfig: async (req, res, next) => {
    const roles = await Role.find({}).select("-_id -__v");
    const eduLevels = await EduLevel.find({}).select("-_id -__v");
    const courseCategories = await CourseCategory.find({}).select("-_id -__v");
    return res.json({
      roles: roles,
      eduLevels: eduLevels,
      courseCategories: courseCategories
    });
  }
};

module.exports = PublicController;
