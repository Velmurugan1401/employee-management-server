const Leave = require('../models/leave');
const Employee = require("../models/employee")
const LeaveType = require("../models/leaveType")


const createLeave = async (req, res) => {

  const {_id} = req.employee
  const {  leaveTypeId, leave, leavesDate, leaveeDate, comments } = req.body;
  const employeeId = _id
  
  try {
    const employee = await Employee.findById({"_id":employeeId});
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    const leaveType = await LeaveType.findById({"_id":leaveTypeId});
    if (!leaveType) {
      return res.status(404).json({ message: 'Leave type not found' });
    }
    const newLeave = new Leave({
      employeeId,
      leaveTypeId: leaveTypeId,
      leave,
      leavesDate,
      leaveeDate,
      comments,
    });

    const savedLeave = await newLeave.save();
    res.status(200).json(savedLeave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getLeaveByEmployeeId = async (req, res) => {
  try {
    const leaves = await Leave.findOne({ employeeId: req.params.employeeId });
    if (!leaves.length) {
      return res.status(404).json({ message: 'No leave records found for this employee' });
    }
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getLeaveDetails = async (req, res) => {
 
 
  try {
    const EmpId = req.employee._id
    const leaveTypes = await LeaveType.aggregate([
      {
        $group: {
          _id: null, 
          totalAllowedLeave: { $sum: "$totalAllowed" },
        },
      },
    ]);

    const totalAllowed = leaveTypes.length > 0 ? leaveTypes[0].totalAllowedLeave : 0;

    // Here Using aggregate methods to get the summary details based on employee
    const leaveDetails = await Leave.aggregate([
      { "$match": { "employeeId":EmpId } },
      {
        $lookup: {
          from: "employees", 
          localField: "employeeId",
          foreignField: "_id",
          as: "employee",
        },
      },
      { $unwind: "$employee" },
      {
        $lookup: {
          from: "leavetypes",
          localField: "leaveTypeId",
          foreignField: "_id",
          as: "leaveType",
        },
      },
      { $unwind: "$leaveType" },
      {
        $group: {
          _id: "$employeeId",
          employeeName: { $first: "$employee.employeeName" },
          employeeId: { $first: "$employee._id" },
          sickLeave: {
            $sum: {
              $cond: [
                { $eq: ["$leaveType.leaveName", "Sick Leave"] },
                "$leave",
                0,
              ],
            },
          },
          casualLeave: {
            $sum: {
              $cond: [
                { $eq: ["$leaveType.leaveName", "Casual Leave"] },
                "$leave",
                0,
              ],
            },
          },

          earnedLeave: {
            $sum: {
              $cond: [
                { $eq: ["$leaveType.leaveName", "Earned Leave"] },
                "$leave",
                0,
              ],
            },
          },
          totalUsedLeaves: { $sum: "$leave" },
        },
      },
      {
        $addFields: {
          totalLeave: totalAllowed,
          availLeave: {
            $subtract: [
              totalAllowed,
              { $ifNull: ["$totalUsedLeaves", 0] }
            ]
          },
        },
      },
      {
        $project: {
          employeeName: 1,
          employeeId: 1,
          totalLeave: 1,
          totalUsedLeaves:1,
          sickLeave: 1,
          casualLeave: 1,
          earnedLeave: 1,
          availLeave: 1,
        },
      },
    ]);
    res.status(200).json(leaveDetails);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching leave details" });
  }
};



const getLeaveSummary = async (req, res) => {
  try {
    const EmpId = req.employee._id
      const leaveSummary = await Leave.aggregate([
        { 
            "$match": { 
                "employeeId": EmpId
            }
        },
        {
            $lookup: {
                from: "leavetypes",          
                localField: "leaveTypeId",   
                foreignField: "_id",         
                as: "leaveType",             
            }
        },
        { 
            $unwind: "$leaveType" 
        },
        {
            $group: {
                _id: "$leaveType.leaveName", 
                totalLeave: { $sum: "$leave" }
            }
        },
        {
            $project: {
                _id: 0,             
                name: "$_id",   
                value: "$totalLeave" 
            }
        }
    ]);
      res.status(200).json(leaveSummary);
  } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching leave summary" });
  }
};


const updateLeave = async (req, res) => {
  try {
    const updatedLeave = await Leave.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedLeave) {
      return res.status(404).json({ message: 'Leave record not found' });
    }

    res.status(200).json(updatedLeave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteLeave = async (req, res) => {
  try {
    const deletedLeave = await Leave.findByIdAndDelete(req.params.id);

    if (!deletedLeave) {
      return res.status(404).json({ message: 'Leave record not found' });
    }

    res.status(200).json({ message: 'Leave record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const LeaveController = {
  getLeaveDetails,
  createLeave,
  getLeaveByEmployeeId,
  getLeaveSummary,
  updateLeave,
  deleteLeave,
}
module.exports = LeaveController