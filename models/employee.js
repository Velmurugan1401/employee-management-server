const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
    default:new Date().getMilliseconds().toString()
  },
  joinDate: {
    type: Date,
    required: true,
    default:new Date()
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('Employee', employeeSchema);
