// models/Article.js

const mongoose = require("mongoose");

// Define a schema: this structures the data
const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  RoomNumber: {
    type: Number,
    required: true,
  },
  

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compile the schema into a model
const Classes = mongoose.model("Classes", classSchema);

module.exports = Classes; // Export the model for use in other files
