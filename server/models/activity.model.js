const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  name: String,
  type: String,
  startDate: Number,
  dueDate: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account"
  }
}, {
  collection: "activities"
});

const Activity = mongoose.model(
  "Activity",
  activitySchema
);

module.exports = Activity;
