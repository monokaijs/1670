const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true
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
