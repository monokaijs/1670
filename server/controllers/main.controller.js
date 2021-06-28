const Account = require("../models/account.model");
const Course = require("../models/course.model");
const Enrollment = require("../models/enrollment.model");
const bcrypt = require("bcryptjs");
const Activity = require("../models/activity.model");
const Material = require("../models/material.model");

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
      let myCourses = [];
      const enrollments = await Enrollment.find({
        trainee: req.userId
      }).populate({
        path: "course",
        populate: {
          path: "category tutor",
          select: "-password -_id"
        }
      });
      myCourses = enrollments.map(enrollment => {
        return {
          ...enrollment.toObject().course,
        };
      });
      const trainingCourses = await Course.find({
        tutor: userId
      }).populate("category tutor").select("-password -id");
      myCourses.push(...trainingCourses.map(course => course.toObject()));
      myCourses = myCourses.map(course => ({
        ...course,
        category: course.category.name,
        tutor: course.tutor?.fullName
      }));
      const accountObject = account.toObject();
      return res.json({
        ...accountObject,
        role: accountObject.role.slug,
        myCourses: myCourses
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
      const course = await Course.findOne({_id: courseId}).populate("tutor", "-password -_id").populate("category");
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
  },
  changePassword: async (req, res, next) => {
    const userId = req.userId;
    try {
      const oldPassword = req.body.old_password;
      const newPassword = req.body.new_password;
      const account = await Account.findOne({
        _id: userId
      });
      const passwordIsValid = bcrypt.compareSync(oldPassword, account.password);
      if (!passwordIsValid) return res.json({error: true, message: "Old password is not correct."});

      await Account.updateOne({
        _id: userId
      }, {
        password: bcrypt.hashSync(newPassword, 8)
      });
      res.json({
        message: "Successfully updated password."
      });
    } catch (err) {
      console.log(err)
      return res.status(200).send({
        error: true,
        message: "Failed to update this password"
      });
    }
  },
  loadCourseActivities: async (req, res, next) => {
    const courseId = req.body.course_id;

    try {
      let activities = await Activity.find({
        course: courseId,
      });
      activities = activities.map(activity => {
        activity = activity.toObject();
        activity.isDue = new Date().getTime() > activity.dueDate;
        return activity;
      })
      res.send({
        activities
      })
    } catch (e) {
      res.json({error: true, message: "Error occurred."})
    }
  },
  loadCourseMaterials: async (req, res, next) => {
    const courseId = req.body.course_id;

    try {
      let materials = await Material.find({
        course: courseId,
      });
      res.send({
        materials
      })
    } catch (e) {
      res.json({error: true, message: "Error occurred."})
    }
  },
  loadAllCourses: async (req, res) => {
    let courses = await Course.find({}).populate({
      path: "category tutor",
      select: "-password -_id"
    });
    courses = courses.map(course => ({
      ...course.toObject(),
      category: course.category.name,
      tutor: course.tutor?.fullName
    }))
    res.json({
      courses
    });
  }
};

module.exports = MainController;
