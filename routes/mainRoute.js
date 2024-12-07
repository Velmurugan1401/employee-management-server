const router = require("express").Router();

const leaveRoute = require("./leaveRoutes")
const employeeRoute = require("./employeeRoutes")
const leaveTypeRoute = require("./leaveTypeRoutes")

router.use("/employee",employeeRoute)
router.use("/type",leaveTypeRoute)
router.use("/leave",leaveRoute)


module.exports = router