const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const requestIp = require('request-ip');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const mainRoute = require("./routes/mainRoute")


dotenv.config();
connectDB();

const app = express();
const PORT = 3007;


// Enable CORS
app.use(cors());

// Parse JSON and URL-encoded data using body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestIp.mw());

app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  keyGenerator: (req, res) => {
    return req.clientIp
  }
}))


app.use("/api/employee",mainRoute.employeeRoute);
app.use("/api/leave",mainRoute.leaveRoute);
app.use("/api/type",mainRoute.leaveTypeRoute);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
