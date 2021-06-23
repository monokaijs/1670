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
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  avatar: String,
  bio: String,
}, {
  collection: "users"
});

const Account = mongoose.model(
  "User",
  accountSchema
);

module.exports = Account;
