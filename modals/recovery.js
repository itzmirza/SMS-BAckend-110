const mongoose = require('mongoose');


const recoverySchema = new mongoose.Schema({

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Students',
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classes',
    required: true,
  },
  totalFee: {
    type: Number,
    required: true,
  },
  paidFee: {
    type: Number,
    required: true,
  },

});

const recovery = mongoose.model('Recovery', recoverySchema);

module.exports = recovery;