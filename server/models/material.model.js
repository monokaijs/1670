const mongoose = require("mongoose");
const materialSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  name: String,
  link: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account"
  }
}, {
  collection: "materials"
});

const Material = mongoose.model(
  "Material",
  materialSchema
);

module.exports = Material;
