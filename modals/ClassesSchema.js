// models/Article.js

const mongoose = require("mongoose");

// Define a schema: this structures the data
const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  teacherName: {
    type: String,
    required: true,
  },
  strength: {
    type: Number,
    required: true,
  },
  Academicyear: {
    type: String,
    required: true,
  },
 
  date: {
    type: Date,
    default: null,
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compile the schema into a model
const Classes = mongoose.model("Classes", classSchema);

module.exports = Classes; // Export the model for use in other files
