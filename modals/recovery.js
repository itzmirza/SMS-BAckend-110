const mongoose = require('mongoose');


const recoverySchema = new mongoose.Schema({
  studentId: {
    type: String,
  },
  studentName: {
    type: String,
  },
  class: {
    type: String,
  },
   totalFee: {
    type: Number,
  },
  paidFee: {
    type: Number,
  },
  remainingFee: {
    type: Number,
  },
  status:{
    type: String,
  },

  
});

const recovery= mongoose.model('Recovery',recoverySchema);

module.exports=recovery;