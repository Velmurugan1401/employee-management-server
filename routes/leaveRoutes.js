const express = require('express');
const router = express.Router();
const LeaveController = require('../controllers/leaveController');

// Create a new leave record
router.post('/create', LeaveController.createLeave);

// Get all leave records
router.get('/getall', LeaveController.getLeaveSummary);

// Get all leave records based on employee
router.get('/getdetails', LeaveController.getLeaveDetails);

// Get leave summery based on sick , casual , earned leaves
router.get('/getSummary', LeaveController.getLeaveSummary);

// Get leave records by employee ID
router.get('/getbyId/:employeeId', LeaveController.getLeaveByEmployeeId);

// Update a leave record
router.put('/updatebyId/:id', LeaveController.updateLeave);

// Delete a leave record
router.delete('/deletebyId/:id', LeaveController.deleteLeave);

module.exports = router;
