const { Task } = require("../../models/task");
const { Client, Worker, Review } = require("../../models/user");

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
        assignedTo: WorkerId
    });

    // attach client name and location from Client schema using createdBy field
    const enrichedAssignedTasks = await Promise.all(assignedTasks.map(async (t) => {
        const taskObj = t.toObject ? t.toObject() : t;
        try {
            const client = await Client.findById(taskObj.createdBy).select('name location');
            if (client) {
                taskObj.client = { name: client.name, location: client.location };
            } else {
                taskObj.client = null;
            }
        } catch (err) {
            taskObj.client = null;
        }
        return taskObj;
    }));

    const completedTasks = await Task.find({
        assignedTo: WorkerId,
        status: "completed"
    });

    res.json({
        worker: worker,
        assignedTasks: enrichedAssignedTasks,
        completedTasks: completedTasks
    });
}


async function markTaskCompletedController(req, res) {
    const WorkerId = req.user.objectId;
    const { taskId } = req.params;

    const TaskDoc = await Task.findOne({
        _id: taskId,
        assignedTo: WorkerId
    });

    if (!TaskDoc) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    TaskDoc.status = "awaiting_review";
    TaskDoc.submittedAt = new Date();
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
    try {
        if (req.user.role !== "worker") {
            return res.status(403).json({
                message: "Access denied: You are not authorized to view the tasks"
            });
        }

        const WorkerId = req.user.objectId;

        const Tasks = await Task.find({
            assignedTo: WorkerId
        }).populate("createdBy", "name image addresses defaultAddress");


        if (Tasks.length === 0) {
            return res.status(200).json({
                message: "No tasks found for this client"
            });
        }

        const result = Tasks.map(task => {

            const Client = task.createdBy?.toObject();

            const DefaultAddress = Client?.addresses.find(
                address => address._id.equals(Client.defaultAddress)
            );

            return {
                ...task.toObject(),

                createdBy: {
                    _id: Client._id,
                    name: Client.name,
                    image: Client.image,

                    defaultAddress: DefaultAddress
                        ? {
                            city: DefaultAddress.city,
                            state: DefaultAddress.state
                        }
                        : null
                }
            };
        });

        res.json({
            message: "Tasks fetched successfully",
            stats: {
                total: result.length,
                active: result.filter(task => task.status === "in-progress").length,
                awaiting_review: result.filter(task => task.status === "awaiting_review").length,
                completed: result.filter(task => task.status === "completed").length,
            },
            tasks: result,
        });
    } catch (error) {
        console.log("Error in controller/worker/worker~getMyTasksController", error);
        console.log("Alert! controller/worker/worker~getMyTasksController just knocked");
        res.status(500).json({ message: "Internal server error(Fetching tasks from database)" });
    }
}

async function getMyDashboardStats(req, res) {
    try {
        if (req.user.role !== 'worker') {
            return res.status(403).json({ error: 'Access denied: clients only' });
        }
        const user = await Worker.findById(req.user.objectId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // fetch tasks from Task collection linked by createdBy
        const tasks = await Task.find({ assignedTo: user._id }).populate({
            path: "createdBy",
            select: "name addresses defaultAddress"
        });

        const stats = {
            total: tasks.length || 0,
            active: tasks.filter(task => task.status === 'in-progress').length || 0,
            awaiting_review: tasks.filter(task => task.status === 'awaiting_review').length || 0,
            completed: tasks.filter(task => task.status === 'completed').length || 0,
        };


        const AssignedTasks = tasks
            .filter(task => task.status === "in-progress")
            .map(task => {

                const DefaultAddress =
                    task.createdBy?.addresses.find(address =>
                        address._id.equals(task.createdBy.defaultAddress)
                    );

                return {
                    ...task.toObject(),
                    client: {
                        name: task.createdBy?.name,
                        location: DefaultAddress
                            ? `${DefaultAddress.city}, ${DefaultAddress.state}`
                            : "N/A"
                    }
                };
            });
        const RecentReviews = await Review.find({
            workerId: user._id
        }).populate([{ path: "clientId", select: "name image" },
            {path: "taskId", select: "title, submittedAt" }]);

        res.status(200).json({
            success: true,
            data: {
                Stats: stats,
                AssignedTasks,
                RecentReviews
            }
        });
    }
    catch (err) {
        console.log("Error in controller/user~getMyDashboardStats", err);
        res.status(500).json({ error: 'Server error' });
    }
}

async function getMyTaskDetails(req, res) {
    try {

        if (req.user.role !== "worker") {
            return res.status(403).json({
                message: "Access denied."
            });
        }

        const WorkerData = await Worker.findById(
            req.user.objectId
        );

        if (!WorkerData) {
            return res.status(404).json({
                message: "Worker not found."
            });
        }
        const { taskId } = req.params;
        const TaskData = await Task.findOne({
            _id: taskId,
            assignedTo: WorkerData._id,
        }).populate({
            path: "createdBy",
            select: "name image mobile addresses defaultAddress"
        });

        if (!TaskData) {
            return res.status(404).json({
                message: "Task not found."
            });
        }

        const DefaultAddress =
            TaskData.createdBy.addresses.find(
                Address =>
                    Address._id.equals(
                        TaskData.createdBy.defaultAddress
                    )
            );

        const ClientData = {
            _id: TaskData.createdBy._id,
            name: TaskData.createdBy.name,
            image: TaskData.createdBy.image,
            phone: TaskData.createdBy.mobile?.number,
            location: DefaultAddress
                ? {
                    street: DefaultAddress.street,
                    city: DefaultAddress.city,
                    state: DefaultAddress.state
                }
                : "N/A"
        };

        const Timeline = [
            {
                type: "assigned",
                title: "Task Assigned",
                time: TaskData.assignedAt,
            },
            {
                type: "completed",
                title: "Marked Completed",
                time: TaskData.completedAt,
            },
            {
                type: "reviewed",
                title: "Reviewed by Client",
                time: TaskData.reviewedAt,
            },
        ];

        const review = await Review.findOne({
            taskId: TaskData._id,
            clientId: TaskData.createdBy._id
        });

        return res.status(200).json({
            success: true,
            data: {
                task: TaskData,
                client: ClientData,
                review: review,
                timeline: Timeline,
            },
        });

    }

    catch (err) {

        console.log("Error in controller/user~getTaskDetails", err);
        return res.status(500).json({
            message: "Internal server error."
        });

    }
}

module.exports = {
    profileController,
    markTaskCompletedController,
    getAvailableTasksController,
    getMyTasksController,
    getMyDashboardStats,
    getMyTaskDetails
};
