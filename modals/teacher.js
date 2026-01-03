const mongoose = require('mongoose');


const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
   number: {
    type: Number,
    required: true,
  },
  cnic: {
    type: Number,
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classes',
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  status:{
    type: String,
    required:true,
  },

  
});

const teacher= mongoose.model('Teacher',teacherSchema);

module.exports=teacher;