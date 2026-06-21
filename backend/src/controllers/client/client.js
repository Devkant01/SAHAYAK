const { Task } = require('../../models/task');
const { Client, Worker } = require('../../models/user');

async function getMyTaskController(req, res) {
    try {
        if (req.user.role !== "client") {
            return res.status(403).json({
                message: "Access denied: You are not authorized to view the tasks"
            });
        }
        const { taskId } = req.params;
        if (!taskId) return res.status(400).json({ message: "Task id is required" });

        const task = await Task.findOne({ _id: idtaskId, createdBy: req.user.objectId });
        if (!task) return res.status(404).json({ message: "Task not found or access denied" });

        if (task.status == "pending") {
            const workers = await Worker.findAll({ category: task.category }, { password: 0, dateOfBirth: 0, __v: 0, createdAt: 0, updatedAt: 0 });
            const details = {
                task: task,
                workers: workers
            }
            return res.status(200).json({ message: "Task fetched successfully", details: details });
        } else { //task.status == "in-progress" || task.status == "completed" || task.status == "awaiting_review"
            const worker = await Worker.findById(task.assignedTo, { password: 0, dateOfBirth: 0, __v: 0, createdAt: 0, updatedAt: 0 });
            const details = {
                task: task,
                worker: worker
            }
            return res.status(200).json({ message: "Task fetched successfully", details: details });
        }
    } catch (error) {
        console.log("Alert! controller/task~getMyTasksController just knocked");
        res.status(500).json({ message: "Internal server error(Fetching tasks from database)" });
    }
}


async function markTaskCompletedController(req, res) {
    const { rating } = req.body;
    try {
        if (req.user.role !== "client") {
            return res.status(403).json({
                message: "Access denied: You are not authorized to mark the task as completed"
            });
        }
        const { taskId } = req.params;
        if (!taskId) return res.status(400).json({ message: "Task id is required" });
        const task = await Task.findOne({ _id: taskId, createdBy: req.user.objectId });
        if (!task) return res.status(404).json({ message: "Task not found or access denied" });
        if (task.status !== "awaiting_review") {
            return res.status(400).json({ message: "Only tasks that are awaiting_review can be marked as completed" });
        }
        task.status = "completed";
        task.completedAt = new Date();
        await task.save();

        //give review
        const worker = await Worker.findById(task.assignedTo);
        if (worker) {
            worker.rating = ((worker.rating * worker.totalReviews) + rating) / (worker.totalReviews + 1);
            worker.totalReviews += 1;
            await worker.save();
        }
        res.status(200).json({ message: "Task marked as completed successfully" });

    } catch (error) {
        console.log("Alert! controller/task~markTaskCompletedController just knocked");
        res.status(500).json({ message: "Internal server error(Marking task as completed)" });
    }

}

async function assignTaskController(req, res) {
    try {
        if (req.user.role !== "client") {
            return res.status(403).json({
                message: "Access denied: You are not authorized to assign the task"
            });
        }
        const { taskId } = req.params;
        const { workerId } = req.body;
        if (!taskId) return res.status(400).json({ message: "Task id is required" });
        if (!workerId) return res.status(400).json({ message: "Worker id is required" });
        const task = await Task.findOne({ _id: taskId, createdBy: req.user.objectId });
        if (!task) return res.status(404).json({ message: "Task not found or access denied" });
        if (task.status !== "pending") { //prevent assigning a task that is already assigned or completed
            return res.status(400).json({ message: "Only tasks that are pending can be assigned" });
        }
        const worker = await Worker.findById(workerId);
        if (!worker) return res.status(404).json({ message: "Worker not found" });
        task.assignedTo = workerId;
        task.status = "in-progress";
        task.acceptedAt = new Date();
        await task.save();
        res.status(200).json({ message: "Task assigned successfully" });
    } catch (error) {
        console.log("Alert! controller/task~assignTaskController just knocked");
        res.status(500).json({ message: "Internal server error(Assigning task to worker)" });
    }
}

module.exports = {
    getMyTaskController,
    markTaskCompletedController,
    assignTaskController
};