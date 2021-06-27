const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  trainee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account"
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
}, {
  collection: "enrollments"
});

const Enrollment = mongoose.model(
  "Enrollment",
  enrollmentSchema
);

module.exports = Enrollment;
