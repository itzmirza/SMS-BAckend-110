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
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buses",
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  cnic: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Drivers = mongoose.model("Drivers", driverSchema);

module.exports = Drivers;
