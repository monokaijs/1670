const mongoose = require("mongoose");

const courseCategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  creationTime: Number
}, {
  collection: "courseCategories"
});

const CourseCategory = mongoose.model(
  "CourseCategory",
  courseCategorySchema
);

module.exports = CourseCategory;
