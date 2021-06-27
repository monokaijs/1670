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
  eduLevelId: {
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
  avatar: String,
  bio: String,
}, {
  collection: "accounts"
});

const Account = mongoose.model(
  "Account",
  accountSchema
);

module.exports = Account;
