// models/Article.js

const mongoose = require("mongoose");

// Define a schema: this structures the data
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  academicyear: {
    type: String,
    required: true,
  },
  assignbus: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compile the schema into a model
const Students = mongoose.model("Students", studentSchema);

module.exports = Students; // Export the model for use in other files
