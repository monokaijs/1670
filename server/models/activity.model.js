const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema({
  course: {
    type: String,
    ref: "Course"
  },
  name: String,
  type: String,
  startDate: Number,
  dueDate: Number
}, {
  collection: "activities"
});

const Activity = mongoose.model(
  "Activity",
  activitySchema
);

module.exports = Activity;
