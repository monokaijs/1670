const Account = require("../models/account.model");
const Course = require("../models/course.model");
const Enrollment = require("../models/enrollment.model");

const MainController = {
  loadProfile: async (req, res, next) => {
    try {
      let userId = req.body.userId;
      if (userId === "me") userId = req.userId;
      const account = await Account.findOne({
        _id: userId
      }).select("-password").populate("role");
      if (!account) return res.json({
        error: true,
        message: "User not found"
      });
      const accountObject = account.toObject();
      return res.json({
        ...accountObject,
        role: accountObject.role.slug,
      });
    } catch (e) {
      console.log(e);
    }
  },
  loadMyCourses: async (req, res, next) => {
    const enrollments = await Enrollment.find({
      studentId: req.userId
    }).populate("courseId");
    res.json({
      enrollments: enrollments
    });
  }
};

module.exports = MainController;
