const app = require("express").Router();
const { upload } = require('../middlewares/multerMiddleware');
const { authenticateToken } = require('../middlewares/authenticate');
const { multerErrorHandler } = require('../controllers/client/multerErrorHandler');
const { publishTaskController, editTaskController, deleteTaskController, getMyTasksController } = require('../controllers/client/taskHandler');
const { getMyTaskController, assignTaskController, markTaskCompletedController, getMyDashboardStats } = require('../controllers/client/client');

app.post("/publish-task", authenticateToken, upload.array('attachments', 5), multerErrorHandler, publishTaskController);
app.post("/edit-task/:id", authenticateToken, editTaskController);
app.delete("/delete-task/:id", authenticateToken, deleteTaskController);
app.get("/my-tasks", authenticateToken, getMyTasksController);

app.get("/my-task/:taskId", authenticateToken, getMyTaskController);
app.post("/assign-task/:taskId/", authenticateToken, assignTaskController);
app.put("/mark-task-completed/:taskId", authenticateToken, markTaskCompletedController);
app.get("/dashboardStats", authenticateToken, getMyDashboardStats);
module.exports = app; 