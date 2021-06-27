const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true
  },
  eduLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EduLevel",
    required: false
  },
  dob: {
    type: String,
  },
  fullName: {
    type: String,
  },
  gender: {
    type: String,
  },
  avatar: {
    type: String,
    default: "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
  },
  bio: String,
}, {
  collection: "accounts"
});

const Account = mongoose.model(
  "Account",
  accountSchema
);

module.exports = Account;
