const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drivers",
  },
  status: {
    type: String,
    required: true,
  },
  studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Students" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Buses = mongoose.model("Buses", busSchema);
module.exports = Buses;
