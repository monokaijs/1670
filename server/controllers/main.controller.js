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
  },
  updateInfo: async (req, res, next) => {
    const userId = req.userId;
    const fullName = req.body.full_name;
    const gender = req.body.gender;
    const dob = req.body.dob;
    const bio = req.body.bio;
    try {
      await Account.updateOne({
        _id: userId
      }, {
        fullName: fullName,
        gender: gender,
        dob: dob,
        bio: bio
      })
      res.json({
        message: "Updated Profile"
      });
    } catch (err) {
      return res.status(200).send({
        error: true,
        message: err
      });
    }
  }
};

module.exports = MainController;
