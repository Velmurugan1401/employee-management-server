const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const authHandler = require("./middleware/authHandler")

const authRoute = require("./routes/authRouter")
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

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: "Too many requests from this IP, please try again after 15 minutes",
//   headers: true,
// });

app.use("/api",authRoute)

// Checking session every request
app.use("/api",authHandler,mainRoute);

// set the error handler if any of the flow throw error it will check and return the relavant response
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
