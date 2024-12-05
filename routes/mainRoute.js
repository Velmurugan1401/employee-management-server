const leaveRoute = require("./leaveRoutes")
const employeeRoute = require("./employeeRoutes")
const leaveTypeRoute = require("./leaveTypeRoutes")



const mainRoute = {
    leaveRoute,
    employeeRoute,
    leaveTypeRoute
}

module.exports = mainRoute