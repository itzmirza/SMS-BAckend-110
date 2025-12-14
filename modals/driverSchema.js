const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  licenseNumber: {
    type: Number,
    required: true,
  },

  assignedBus: {
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

const Drivers = mongoose.model("Driver", driverSchema);

module.exports = Drivers;
