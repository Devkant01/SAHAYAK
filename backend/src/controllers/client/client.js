const { Task } = require('../../models/task');
const { Client, Worker, Review } = require('../../models/user');

async function getMyTaskController(req, res) {
    try {
        if (req.user.role !== "client") {
            return res.status(403).json({
                message: "Access denied: You are not authorized to view this task"
            });
        }

        const { taskId } = req.params;

        if (!taskId) {
            return res.status(400).json({
                message: "Task id is required"
            });
        }

        const tassk = await Task.findOne({
            _id: taskId,
            createdBy: req.user.objectId
        }, {
            __v: 0
        });

        if (!tassk) {
            return res.status(404).json({
                message: "Task not found or access denied"
            });
        }


        const client = await Client.findById(
            tassk.createdBy,
            {
                password: 0,
                __v: 0
            }
        );

        var location = {};
        if (client && client.defaultAddress) {
            const DefaultAddress = client.addresses.find(
                address => address._id.equals(client.defaultAddress)
            );
            location.city = DefaultAddress ? DefaultAddress.city : "";
            location.state = DefaultAddress ? DefaultAddress.state : "";
            location.country = DefaultAddress ? DefaultAddress.country : "";
            location.coordinates = DefaultAddress ? DefaultAddress.location.coordinates : [];
        }

        const expectedStart = tassk.acceptedAt;
        const hiredAt = tassk.acceptedAt;
        const progress = {
            percentage: tassk.status === "pending" ? 25 : tassk.status === "in-progress" ? 60 : tassk.status === "awaiting_review" ? 90 : 100
        }
        const currentPhase = tassk.status;
        const expectedCompletion = tassk.completedAt;
        const duration = tassk.completedAt && tassk.acceptedAt ? Math.ceil((tassk.completedAt - tassk.acceptedAt) / (1000 * 60 * 60 * 24)) : null;
        const task = {
            ...tassk.toObject(),
            location,
            expectedStart,
            hiredAt,
            progress,
            currentPhase,
            expectedCompletion,
            duration
        }
        // Fetch available workers for the task's category if the task is pending

        let recommendedWorkers = [];
        let worker = null;
        let review = null;
        if (task.status === "pending") {
            recommendedWorkers = await Worker.find(
                {
                    $or: [
                        { category: task.category },
                        { category: "other" }
                    ]
                },
                {
                    password: 0,
                    dateOfBirth: 0,
                    __v: 0,
                    createdAt: 0,
                    updatedAt: 0
                }
            );
        } else {
            worker = await Worker.findById(
                task.assignedTo,
                {
                    password: 0,
                    dateOfBirth: 0,
                    __v: 0,
                    createdAt: 0,
                    updatedAt: 0
                }
            );
        }
        if (task.status === "completed") {
            review = await Review.findOne({ taskId: task._id, clientId: req.user.objectId }, { __v: 0, createdAt: 0, updatedAt: 0 });
        }
        let timeline = [];
        let update = null; //implement it later

        const details = {
            task,
            worker,
            recommendedWorkers,
            timeline,
            update,
            review
        };

        return res.status(200).json({
            success: true,
            message: "Task fetched successfully",
            data: details
        });

    } catch (error) {

        console.log(
            "Error in controller/task~getMyTaskController",
            error
        );

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function getMyDashboardStats(req, res) {
    try {
        if (req.user.role !== 'client') {
            return res.status(403).json({ error: 'Access denied: clients only' });
        }
        const user = await Client.findById(req.user.objectId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // fetch tasks from Task collection linked by createdBy
        const tasks = await Task.find({ createdBy: user._id });

        const stats = {
            TotalTasks: tasks.length || 0,
            CompletedTasks: tasks.filter(task => task.status === 'completed').length || 0,
            ActiveTasks: tasks.filter(task => task.status === 'in-progress').length || 0,
            PendingApplications: tasks.filter(task => task.status === 'pending').length || 0,
        };

        const activeTasks = tasks.filter(task => task.status === 'in-progress') || [];

        const topWorkers = await Worker.find()
            .select('name image rating skills location completedJobs')
            .sort({ rating: -1 })
            .limit(2);

        const helpers = topWorkers.map(worker => ({
            _id: worker._id,
            name: worker.name,
            image: worker.image || '',
            rating: worker.rating || 0,
            skill: worker.skills?.[0] || 'N/A',
            location: worker.location || '',
            completedJobs: worker.completedJobs || 0
        }));

        const emergencyServices = [
            { name: 'Electrician' },
            { name: 'Plumber' },
            { name: 'AC Repair' },
            { name: 'Carpenter' },
            { name: 'Cleaning Service' }
        ];

        res.status(200).json({
            success: true,
            data: {
                Stats: stats,
                Tasks: activeTasks,
                Helpers: helpers,
                Services: emergencyServices
            }
        });
    }
    catch (err) {
        console.log("Error in controller/user~getMyDashboardStats", err);
        res.status(500).json({ error: 'Server error' });
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
    getMyDashboardStats,
    markTaskCompletedController,
    assignTaskController
};