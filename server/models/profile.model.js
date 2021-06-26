const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
}, {
  collection: "profiles"
});

const Profile = mongoose.model(
  "Profile",
  profileSchema
);

module.exports = Profile;
