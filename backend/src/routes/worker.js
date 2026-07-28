const app = require("express").Router();
const { authenticateToken } = require("../middlewares/authenticate");
const { VerifyAadharController, VerifyAadharOtpController } = require("../controllers/worker/aadharAuth");
const {
    profileController,
    markTaskCompletedController,
    getMyTasksController,
    getMyTaskDetails,
    getMyDashboardStats,
} = require("../controllers/worker/worker");

app.post("/verify-aadhar", authenticateToken, VerifyAadharController);
app.post("/verify-aadhar-otp", authenticateToken, VerifyAadharOtpController);

app.get("/my-profile", authenticateToken, profileController);
app.get("/dashboardStats", authenticateToken, getMyDashboardStats);
app.get("/my-tasks", authenticateToken, getMyTasksController);
app.get("/my-task/:taskId", authenticateToken, getMyTaskDetails);
app.put("/mark-task-completed/:taskId", authenticateToken, markTaskCompletedController);


module.exports = app;
