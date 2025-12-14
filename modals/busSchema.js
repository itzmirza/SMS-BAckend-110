
const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
  },
  model: {
    type: Number,
    required: true,
  },
  capacity: { 
    type: Number,
    required: true,
  },

  assignedDriver: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  studentIds:[{ type: mongoose.Schema.Types.ObjectId, ref: "Students" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compile the schema into a model
const Buses = mongoose.model("Bus", busSchema);

module.exports = Buses; // Export the model for use in other files
