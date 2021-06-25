const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
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
  avatar: String,
  bio: String,
}, {
  collection: "profiles"
});

const Profile = mongoose.model(
  "Profile",
  profileSchema
);

module.exports = Profile;
