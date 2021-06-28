const Account = require("../models/account.model");
const Course = require("../models/course.model");
const Role = require("../models/role.model");
const EduLevel = require("../models/edulevel.model")
const CourseCategory = require("../models/courseCategory.model");
const bcrypt = require("bcryptjs");
const Enrollment = require("../models/enrollment.model");

const ManageController = {
  loadAccounts: async (req, res, next) => {
    const accounts = await Account.find({}).select("-password -id").populate("role").populate("eduLevel");
    const listAccounts = [];
    accounts.forEach(account => {
      account = account.toObject();
      account.role = account.role.slug;
      account.eduLevel = (account.eduLevel && account.eduLevel.slug) ? account.eduLevel.slug : "";
      listAccounts.push(account);
    });
    res.json({
      accounts: listAccounts
    })
  },
  createAccount: async (req, res, next) => {
    const fullName = req.body['full_name'];
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const role = req.body.role;
    const bio = req.body.bio;

    try {
      const chosenRole = await Role.findOne({
        slug: role
      });

      if (!chosenRole) return res.json({
        error: true,
        message: "Invalid data"
      });
      const account = await Account.create({
        fullName,
        username,
        dob: dob,
        gender: gender,
        bio,
        password: bcrypt.hashSync(password, 8),
        email,
        role: chosenRole._id,
      });
      res.json({
        message: "Successfully created new account."
      })
    } catch (e) {
      console.log(e);
      res.json({
        error: true,
        message: "Error occurred while creating new account"
      });
    }

  },
  updateAccount: async (req, res, next) => {
    const username = req.body.username;

    const fullName = req.body.full_name;
    const gender = req.body.gender;
    const dob = req.body.dob;
    const bio = req.body.bio;
    const eduLevelSlug = req.body.edu_level;
    const toeicScore = req.body.toeic_score;

    try {
      const eduLevel = await EduLevel.findOne({slug: eduLevelSlug});
      if (!eduLevel) return res.json({error: true, message: "Edu Level not found."});
      await Account.updateOne({
        username
      }, {
        fullName: fullName,
        gender: gender,
        dob: dob,
        bio: bio,
        eduLevel: eduLevel._id,
        toeicScore
      });
      res.status(200).send({message: "User's info was updated successfully."});
    } catch (e) {
      return res.status(200).send({
        error: true,
        message: e
      });
    }
  },
  deleteAccount: async (req, res, next) => {
    const username = req.body.username;
    try {
      const existingAccount = await Account.findOne({username});
      if (!existingAccount) return res.json({error: true, message: "This account is not exists"});
      await Account.deleteOne({username: username});
      res.send({message: "Deleted account."})
    } catch (e) {
      res.send({error: true, message: "Failed to delete this account."})
    }
  },
  createCourse: async (req, res, next) => {
    const title = req.body.course_name;
    const creationTime = new Date().getTime();
    const categoryCode = req.body.category;
    const description = req.body.description;

    try {
      const category = await CourseCategory.findOne({code: categoryCode});
      if (!category) return res.json({error: true, message: "Invalid category."});
      await Course.create({
        title, creationTime, category: category._id, description
      });
      res.json({message: "Created new course."})
    } catch (e) {
      console.log(e);
      res.json({error: true, message: "Failed to create new course."})
    }
  },
  assignCourse: async (req, res, next) => {
    const courseId = req.body.course_id;
    const traineeUsernames = req.body.trainees;
    const trainerUsername = req.body.trainer;
    try {
      const course = await Course.findOne({_id: courseId});
      const trainer = await Account.findOne({username: trainerUsername});
      if (!course) return res.send({error: true, message: "Resource is not available"});
      await Course.updateOne({_id: course._id}, {
        tutor: trainer ? trainer._id : null
      });
      const users = await Account.find({
        username: {$in: traineeUsernames}
      });
      // requested ids
      const requestedIds = users.map(user => user._id.toString());
      const enrolled = await Enrollment.find({
        course: courseId
      });
      // already enrolled trainee ids
      const currentIds = enrolled.map(enrollment => enrollment.trainee.toString());

      const optIn = requestedIds.filter(x => !currentIds.includes(x));
      const optOut = currentIds.filter(x => !requestedIds.includes(x));

      console.log("optIn", optIn);
      console.log("optOut", optOut);

      optIn.forEach(traineeId => {
        Enrollment.create({
          trainee: traineeId,
          course: courseId
        });
      });
      optOut.forEach(traineeId => {
        Enrollment.deleteOne({
          trainee: traineeId,
          course: courseId
        })
      });
      res.json({message: "Successfully done the task."})
    } catch (e) {
      console.log(e);
      res.json({error: true, message: "Error while assigning people to course."})
    }
  },
  updateCourse: async (req, res, next) => {
    try {
      const courseId = req.body.course_id;
      const title = req.body.course_name;
      const categoryCode = req.body.category;
      const description = req.body.description;
      const category = await CourseCategory.findOne({code: categoryCode});
      if (!category) return res.json({error: true, message: "Category is not available"});
      await Course.updateOne({
        _id: courseId
      }, {
        category: category._id,
        description,
        title
      });
      res.json({
        message: "Successfully updated information."
      })
    } catch (e) {
      res.json({
        error: true,
        message: "Error occurred"
      })
    }
  },
  deleteCourse: async (req, res, next) => {
    try {
      const courseId = req.body.course_id;
      await Enrollment.deleteMany({
        course: courseId
      });
      await Course.deleteOne({
        _id: courseId
      });
      res.json({
        message: "Course was deleted."
      });
    } catch (e) {
      res.json({
        error: true,
        message: "Error occurred"
      })
    }
  },
  loadCourses: async (req, res, next) => {
    try {
      let courses = await Course.find({}).populate("category").populate("tutor", "-password -_id");
      courses = courses.map(course => {
        course = course.toObject();
        return {
          ...course,
          category: course.category.code
        }
      })
      res.json({
        courses: courses
      });
    } catch (e) {
      res.json({
        error: true,
        message: "Failed to load categories"
      })
    }
  },
  createRole: async (req, res, next) => {
    try {
      const body = req.body;
      const slugify = require("../utils/slugify");
      if (await Role.findOne({slug: slugify(body.title)})) return res.json({
        error: true,
        message: "This education level is already exist"
      });
      await Role.create({
        slug: slugify(body.title),
        title: body.title
      });
      res.json({
        message: "Created new role."
      });
    } catch (e) {
      console.log(e);
      res.json({
        error: true,
        message: "Error occurred while creating new role."
      });
    }
  },
  deleteRole: async (req, res, next) => {
    try {
      const body = req.body;
      await Role.deleteOne({
        slug: body.slug
      });
      res.json({
        message: "Deleted this role."
      });
    } catch (e) {
      res.json({
        error: true,
        message: "Error occurred while deleting this role."
      });
    }
  },
  updateRole: async (req, res, next) => {
    try {
      const body = req.body;
      const role = await Role.findOne({slug: body.slug});
      if (role) return res.json({
        error: true,
        message: "This role is not exist"
      });
      await Role.updateOne({
        slug: body.slug
      }, {
        title: role.title
      });
      res.json({
        message: "Updated this role."
      });
    } catch (e) {
      res.json({
        error: true,
        message: "Error occurred while updating this role."
      });
    }
  },
  createEduLevel: async (req, res, next) => {
    try {
      const body = req.body;
      const slugify = require("../utils/slugify");
      if (await EduLevel.findOne({slug: slugify(body.edu_level)})) return res.json({
        error: true,
        message: "This education level is already exist"
      });
      await EduLevel.create({
        slug: slugify(body.edu_level),
        title: body.edu_level
      });
      res.json({
        message: "Created new education level."
      });
    } catch (e) {
      res.json({
        error: true,
        message: "Error occurred while creating new education level."
      });
    }
  },
  updateEduLevel: async (req, res, next) => {
    try {
      const body = req.body;
      const eduLevel = await EduLevel.findOne({slug: body.slug});
      if (!eduLevel) return res.json({
        error: true,
        message: "This edu level is not exist"
      });
      await EduLevel.updateOne({
        slug: body.slug
      }, {
        title: body.title
      });
      res.json({
        message: "Updated this education level."
      });
    } catch (e) {
      res.json({
        error: true,
        message: "Error occurred while updating this education level."
      });
    }
  },
  deleteEduLevel: async (req, res, next) => {
    try {
      const body = req.body;
      await EduLevel.deleteOne({
        slug: body.slug
      });
      res.json({
        message: "Deleted this education level."
      });
    } catch (e) {
      res.json({
        error: true,
        message: "Error occurred while deleting this education level."
      });
    }
  },
  loadCategories: async (req, res, next) => {
    const categories = await CourseCategory.find({});
    res.json({categories});
  },
  createCategory: async (req, res, next) => {
    const name = req.body.name;
    const code = req.body.code;
    const creationTime = new Date().getTime();
    const description = req.body.description;
    try {
      await CourseCategory.create({
        name: name,
        code: code,
        description: description,
        creationTime: creationTime
      });
      res.json({
        message: "Created new category"
      })
    } catch (e) {
      res.json({
        error: true,
        message: "Error occurred while creating new category"
      })
    }
  },
  updateCategory: async (req, res, next) => {
    const code = req.body.code;
    const name = req.body.name;
    const description = req.body.description;
    try {
      await CourseCategory.updateOne({
        code: code
      }, {
        name: name,
        description: description
      });
      res.json({message: "Updated category"});
    } catch (e) {
      res.json({error: true, message: "Error occurred."})
    }
  },
  deleteCategory: async (req, res, next) => {

  },
};

module.exports = ManageController;
