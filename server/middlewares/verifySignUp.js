const Account = require("../models/account.model");
const validation = require("../utils/validation");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username
  try {
    const user = await Account.findOne({
      $or: [{
        username: req.body.username
      }, {
        email: req.body.email
      }]
    });
    if (user) {
      return res.status(200).send({
        error: true,
        message: "Username or Email is already in use!"
      });
    }
    next();
  } catch(err) {
    return res.status(200).send({
      error: true,
      message: err
    });
  }
};

confirmPassword = (req, res, next) => {
  if (!validation.password(req.body.password)) {
    return res.status(200).send({
      error: true,
      message: "Password's length must be greater than 8."
    });
  }

  next();
}

validateInput = (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.dob || !req.body.gender || !req.body['full_name']) {
    return res.status(200).send({
      error: true,
      message: "Important fields must not be empty."
    });
  }

  if (!validation.username(req.body.username)) {
    return res.status(200).send({
      error: true,
      message: "Your username's length must be from 6 to 14 characters."
    });
  }
  if (!validation.unicode(req.body['full_name'])) {
    return res.status(200).send({
      error: true,
      message: "Your full name must not contain special characters."
    });
  }
  if (!validation.email(req.body.email)) {
    return res.status(200).send({
      error: true,
      message: "Invalid email format."
    });
  }

  if (!validation.date(req.body.dob)) {
    return res.status(200).send({
      error: true,
      message: "Invalid date format. Correct format: YYYY/MM/DD"
    });
  }

  next();
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  confirmPassword,
  validateInput
};

module.exports = verifySignUp;
