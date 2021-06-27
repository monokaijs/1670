const mongoose = require("mongoose");

const courseCategorySchema = new mongoose.Schema({
  name: String,
  code: String,
  description: String,
  creationTime: Number
}, {
  collection: "courseCategories"
});

const CourseCategory = mongoose.model(
  "CourseCategory",
  courseCategorySchema
);

module.exports = CourseCategory;
