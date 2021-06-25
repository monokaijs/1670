const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account"
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
}, {
  collection: "enrollments"
});

const Enrollment = mongoose.model(
  "EduLevel",
  enrollmentSchema
);

module.exports = Enrollment;
