const express = require('express');
const cors = require('cors');
const clientRoutes = require('./routes/client');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const workerRoutes = require('./routes/worker');
const cookieParser = require("cookie-parser"); //now we can access cookies via req.cookies

const app = express();
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
})
)
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

const API_BASE = '/api/v1';

app.use(`${API_BASE}/auth`, authRoutes);
app.use(`${API_BASE}/user`, userRoutes);
app.use(`${API_BASE}/client`, clientRoutes);
app.use(`${API_BASE}/worker`, workerRoutes);

/*
  @GET: home page.
*/
app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;