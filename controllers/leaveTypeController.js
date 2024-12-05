const LeaveType = require('../models/leaveType');


const createLeaveType = async (req, res) => {
    const { leaveName, totalAllowed } = req.body;
    try {
        const existingLeaveType = await LeaveType.findOne({ leaveName });
        if (existingLeaveType) {
            return res.status(400).json({ message: 'Leave type already exists' });
        }
        const newLeaveType = new LeaveType({
            leaveName,
            totalAllowed,
        });
        await newLeaveType.save();
        res.status(200).json({ message: 'Leave type created successfully', newLeaveType });
    } catch (error) {
        res.status(500).json({ message: 'Error creating leave type' });
    }
};


const getAllLeaveTypes = async (req, res) => {
    try {
        const leaveTypes = await LeaveType.find();
        res.status(200).json(leaveTypes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leave types' });
    }
};


const getLeaveTypeById = async (req, res) => {
    const { id } = req.params;

    try {
        const leaveType = await LeaveType.findById(id);
        if (!leaveType) {
            return res.status(404).json({ message: 'Leave type not found' });
        }
        res.status(200).json({ leaveType });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leave type' });
    }
};


const updateLeaveType = async (req, res) => {
    const { id } = req.params;
    const { leaveName, totalAllowed } = req.body;

    try {
        const leaveType = await LeaveType.findById(id);
        if (!leaveType) {
            return res.status(404).json({ message: 'Leave type not found' });
        }

        // Update leave type fields
        leaveType.leaveName = leaveName || leaveType.leaveName;
        leaveType.totalAllowed = totalAllowed || leaveType.totalAllowed;

        await leaveType.save();
        res.status(200).json({ message: 'Leave type updated successfully', leaveType });
    } catch (error) {
        res.status(500).json({ message: 'Error updating leave type' });
    }
};


const deleteLeaveType = async (req, res) => {
    const { id } = req.params;

    try {
        const leaveType = await LeaveType.findByIdAndDelete(id);
        if (!leaveType) {
            return res.status(404).json({ message: 'Leave type not found' });
        }
        res.status(200).json({ message: 'Leave type deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting leave type' });
    }
};

const leaveTypeController = {
    createLeaveType,
    getAllLeaveTypes,
    getLeaveTypeById,
    updateLeaveType,
    deleteLeaveType,
};
module.exports = leaveTypeController
