const mongoose = require('mongoose');


const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
   number: {
    type: Number,
  },
  qualification: {
    type: String,
  },
  subject: {
    type: String,
  },
  status:{
    type: String,
  },

  
});

const teacher= mongoose.model('Teacher',teacherSchema);

module.exports=teacher;