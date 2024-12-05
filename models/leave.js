const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    leaveTypeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LeaveType',
        required: true,
    },
    leave:{
        type: Number,
        required: true,
        default: 1,
    },
    leavesDate: {
        type: Date,
        required: true,
    },
    leaveeDate: {
        type: Date,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    updatedDate: {
        type: Date,
        default: Date.now,
    },
    comments: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('Leave', leaveSchema);
