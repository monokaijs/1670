const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
  slug: String,
  title: String
}, {
  collection: "roles"
});

const Role = mongoose.model(
  "Role",
  roleSchema
);

module.exports = Role;
