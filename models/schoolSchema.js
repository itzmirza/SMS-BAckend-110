// models/Article.js

const mongoose = require("mongoose");

// Define a schema: this structures the data
const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,

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
const Schools = mongoose.model("School", schoolSchema);

module.exports = Schools; // Export the model for use in other files
