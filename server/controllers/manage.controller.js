const Account = require("../models/account.model");
const Profile = require("../models/profile.model");

const ManageController = {
  createAccount: async (req, res, next) => {
    const fullName = req.body['full_name'];
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const role = req.body.role;
    const bio = req.body.bio;

    const newProfile = await Profile.create({
      fullName,
    })

    const account = await Account.create({
      fullName,
      username,
      password,

    })

  },
  createCourse: async (req, res, next) => {
  },
  updateAccount: async (req, res, next) => {
  },
  updateCourse: async (req, res, next) => {
  },
  loadCourses: async (req, res, next) => {
  },
  loadAccounts: async (req, res, next) => {
  }
};

module.exports = ManageController;
