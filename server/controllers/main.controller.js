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
      const enrollments = await Enrollment.find({
        trainee: req.userId
      }).populate({
        path: "course",
        populate: {
          path: "category tutor",
          select: "-password -_id"
        }
      });
      const accountObject = account.toObject();
      return res.json({
        ...accountObject,
        role: accountObject.role.slug,
        myCourses: enrollments.map(enrollment => {
          return {
            ...enrollment.toObject().course,
            category: enrollment.course.category.name,
            tutor: enrollment.course.tutor.fullName
          };
        })
      });
    } catch (e) {
      console.log(e);
    }
  },
  loadMyCourses: async (req, res, next) => {
    const enrollments = await Enrollment.find({
      trainee: req.userId
    }).populate("course");
    res.json({
      enrollments: enrollments.map(enrollment => enrollment.course)
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
  },
  loadCourseInfo: async (req, res, next) => {
    const courseId = req.body.course_id;
    try {
      const course = await Course.findOne({_id: courseId}).populate("tutor", "-password -_id");
      const enrolled = await Enrollment.find({
        course: course._id
      }).populate("trainee", "-password -_id");
      res.json({
        ...course.toObject(),
        trainees: enrolled.map(enrollment => enrollment.trainee)
      })
    } catch (err) {
      console.log(err);
      return res.status(200).send({
        error: true,
        message: "Failed to load course info"
      });
    }
  },
  deleteCourse: async (req, res, next) => {
    const courseId = req.body.course_id;
    try {
      await Enrollment.deleteMany({
        course: courseId
      });
      await Course.deleteOne({
        _id: courseId
      });
      res.json({
        message: "Successfully deleted this course."
      })
    } catch (err) {
      console.log(err);
      return res.status(200).send({
        error: true,
        message: "Failed to delete this course"
      });
    }
  }
};

module.exports = MainController;
