const app = require("express").Router();
const { authenticateToken } = require("../middlewares/authenticate");
const { VerifyAadharController, VerifyAadharOtpController } = require("../controllers/worker/aadharAuth");
const { profileController, markTaskCompletedController } = require("../controllers/worker/worker");


app.post("/verify-aadhar", authenticateToken, VerifyAadharController);
app.post("/verify-aadhar-otp", authenticateToken, VerifyAadharOtpController);

app.get("/my-profile", authenticateToken, profileController);
// app.post("/task/:taskId", authenticateToken, markTaskCompletedController);
 

module.exports = app;
