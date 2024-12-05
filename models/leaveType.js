const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    leaveName: {
        type: String,
        required: true,
        unique: true,
    },
    totalAllowed: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    updatedDate: {
        type: Date,
        default: Date.now,
    },
   
});

module.exports = mongoose.model('LeaveType', leaveSchema);
