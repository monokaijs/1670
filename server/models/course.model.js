const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account"
  },
  creationTime: Number,
  description: String,
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseCategory"
  }]
}, {
  collection: "courses"
});

const Course = mongoose.model(
  "Course",
  courseSchema
);

module.exports = Course;
