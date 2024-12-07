const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// create New employee without session token
router.post('/signup', employeeController.createEmployee);

// login employee
router.post('/login', employeeController.employeeLogin);

module.exports = router

