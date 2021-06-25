const mongoose = require("mongoose");

const eduLevelSchema = new mongoose.Schema({
  title: String,
  slug: String
}, {
  collection: "edulevel"
});

const EduLevel = mongoose.model(
  "EduLevel",
  eduLevelSchema
);

module.exports = EduLevel;
