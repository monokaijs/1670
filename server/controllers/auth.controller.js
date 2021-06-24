const Account = require("../models/account.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Role = require("../models/role.model");
const config = require("../config/system.config");

const AuthController = {
  login: async (req, res, next) => {
    const username = req.body.username.toLowerCase();
    const user = await Account.findOne({
      username: username
    }).populate("role");
    if (!user) return res.json({
      error: true,
      message: "Invalid Username!"
    });

    console.log(user);

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.json({
        error: true,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({_id: user._id}, config.secret, {
      expiresIn: 86400 * 30 // 1 month
    });
    res.json({
      _id: user._id,
      id: user.id,
      username: username,
      email: user.email,
      gender: user.gender,
      role: user.role.slug,
      accessToken: token
    });
  },
  createAccount: async (req, res) => {
    const defaultAvatar = "https://api.eof.vn/assets/avatars/default-avatar.jpg"
    const username = req.body.username;
    const fullName = req.body['full_name'];
    const email = req.body.email;
    const password = req.body.password;
    const gender = req.body.gender;
    const date = req.body.dob;

    const user = new Account({
      username: username.toLowerCase(),
      avatar: defaultAvatar,
      fullName: fullName,
      gender: gender,
      email: email,
      dob: date,
      password: bcrypt.hashSync(password, 8)
    });

    await user.save((err, user) => {
      if (err) {
        return res.status(200).send({
          error: true,
          message: err
        });
      }
      Role.findOne({
        slug: req.body.role
      }, (err, role) => {
        if (err) {
          return res.status(200).send({
            error: true,
            message: err
          });
        }
        user.role = role._id;
        user.save(err => {
          res.status(200).send({message: "User was registered successfully!"});
        });
      });
    });
  }
};

module.exports = AuthController;
