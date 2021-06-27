const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account"
  },
  creationTime: Number,
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseCategory"
  }
}, {
  collection: "courses"
});

const Course = mongoose.model(
  "Course",
  courseSchema
);

module.exports = Course;
