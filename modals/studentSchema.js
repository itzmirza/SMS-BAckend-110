// models/Article.js

const mongoose = require("mongoose");

// Define a schema: this structures the data
const studentSchema = new mongoose.Schema({
 
  // Student information
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'],
  },
  religion: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  bFormNumber: {
    type: String,
    required: true,
    unique: true,
  },
  homeAddress: {
    type: String,
    required: true,
  },

// parent information

  guardianName: {
    type: String,
    required: true,
  },
  guardianContact: {
    type: Number,
    required: true,
  },
  CNIC: {
    type: Number,
    required: true,
    unique: true,
  },
  guardianEmail: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  
  classId:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Classes"
  }],


  busId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Buses"
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compile the schema into a model
const Students = mongoose.model("Students", studentSchema);

module.exports = Students; // Export the model for use in other files
