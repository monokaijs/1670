const Account = require("../models/account.model");
const Course = require("../models/course.model");
const Role = require("../models/role.model");
const EduLevel = require("../models/edulevel.model")
const CourseCategory = require("../models/courseCategory.model");
const bcrypt = require("bcryptjs");

const ManageController = {
  loadAccounts: async (req, res, next) => {
    const accounts = await Account.find({}).select("-password -id").populate("role");
    const listAccounts = [];
    accounts.forEach(account => {
      account = account.toObject();
      account.role = account.role.slug;
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
  updateCourse: async (req, res, next) => {
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
      if (eduLevel) return res.json({
        error: true,
        message: "This edu level is not exist"
      });
      await EduLevel.updateOne({
        slug: body.slug
      }, {
        title: eduLevel.title
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
    const name = req.body.category_name;
    const code = req.body.code;
    const creationTime = new Date(req.body.creation_time).getTime();
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

  },
  deleteCategory: async (req, res, next) => {

  },
};

module.exports = ManageController;
