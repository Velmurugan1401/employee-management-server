const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Create a new employee
router.post('/create', employeeController.createEmployee);

// Get all employees
router.get('/get', employeeController.getEmployees);

// Get a single employee by ID
router.get('/getbyId/:id', employeeController.getEmployeeById);

// Update an employee
router.put('/updatebyId/:id', employeeController.updateEmployee);

// Delete an employee
router.delete('/deletebyId/:id', employeeController.deleteEmployee);

module.exports = router;
