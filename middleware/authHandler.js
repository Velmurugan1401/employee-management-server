const jwt = require('jsonwebtoken');
const Employee = require("../models/employee");


const authenticateJWT = async (req, res, next) => {
    
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    try {
       
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7).trim() : token;

        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        const employee = await Employee.findById(decoded.employeeId);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        req.employee = employee ;
        next();
    } catch (error) {
        console.error('JWT Error:', error.message);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};



module.exports = authenticateJWT
