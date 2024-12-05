const express = require('express');
const router = express.Router();
const leaveTypeController = require('../controllers/leaveTypeController');

// Create a new leave type
router.post('/create', leaveTypeController.createLeaveType);

// Get all leave types
router.get('/get', leaveTypeController.getAllLeaveTypes);

// Get a leave type by ID
router.get('/getbyId/:id', leaveTypeController.getLeaveTypeById);

// Update a leave type by ID
router.put('/updatebyId/:id', leaveTypeController.updateLeaveType);

// Delete a leave type by ID
router.delete('/deletebyId/:id', leaveTypeController.deleteLeaveType);

module.exports = router;
