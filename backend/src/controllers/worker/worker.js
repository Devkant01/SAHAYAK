const { Task } = require("../../models/task");
const { User, Worker } = require("../../models/user");

async function profileController(req, res) {
    const WorkerId = req.user.objectId;

    const worker = await Worker.findOne({
        _id: WorkerId
    });

    if (!worker) {
        return res.status(404).json({
            message: "Worker not found"
        });
    }

    const assignedTasks = await Task.find({
        assignedWorker: WorkerId
    });

    const completedTasks = await Task.find({
        assignedWorker: WorkerId,
        status: "completed"
    });

    res.json({
        worker: worker,
        assignedTasks: assignedTasks,
        completedTasks: completedTask
    });
}



async function markTaskCompletedController(req, res) {
    const WorkerId = req.user.objectId;
    const { taskId } = req.params;

    const TaskDoc = await Task.findOne({
        _id: taskId,
        assignedWorker: WorkerId
    });

    if (!TaskDoc) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    TaskDoc.status = "awaiting_review";
    await TaskDoc.save();

    res.json({
        message: "Task completed and submitted for review"
    });
}


async function getAvailableTasksController(req, res) {
    const Tasks = await Task.find({
        status: "pending"
    }).populate("clientId");

    res.json(Tasks);
}

async function getMyTasksController(req, res) {
    const WorkerId = req.user.objectId;

    const Tasks = await Task.find({
        assignedWorker: WorkerId
    });

    res.json(Tasks);
}


module.exports = {
    profileController,
    acceptTaskController,
    markTaskCompletedController,
    getAvailableTasksController,
    getMyTasksController
};