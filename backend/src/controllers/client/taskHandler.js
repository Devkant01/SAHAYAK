const { Task } = require('../../models/task');
const { Client } = require('../../models/user');
const { deleteFromCloudinary, uploadOnCloudinary } = require('../../utils/uploadImage.js');

async function getMyTasksController(req, res) {
    try {
        if (req.user.role !== "client") {
            return res.status(403).json({
                message: "Access denied: You are not authorized to view the tasks"
            });
        }

        const tasks = await Task.find({ createdBy: req.user.objectId }).select("-createdBy -__v -createdAt -updatedAt");
        if (tasks.length === 0) {
            return res.status(200).json({
                message: "No tasks found for this client"
            });
        }
        return res.status(200).json({
            message: "Tasks fetched successfully",
            tasks
        });
    } catch (error) {
        console.log("Alert! controller/task~getMyTasksController just knocked");
        res.status(500).json({ message: "Internal server error(Fetching tasks from database)" });
    }
}

async function editTaskController(req, res) {
    try {
        if (req.user.role !== "client") {
            return res.status(403).json({ message: "Access denied: You are not authorized to edit tasks" });
        }

        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Task id is required" });

        // Only allow certain fields to be updated by client
        const allowed = ["title", "description", "category", "dueDate"];
        const updates = {};
        for (const key of allowed) {
            if (Object.prototype.hasOwnProperty.call(req.body, key)) {
                updates[key] = req.body[key];
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update" });
        }

        // title is required if provided and must be non-empty
        if (updates.title && String(updates.title).trim() === "") {
            return res.status(400).json({ message: "Title cannot be empty" });
        }

        if (updates.category) {
            updates.category = normalize(updates.category);
            // ensure category matches allowed enums from schema
            const allowedCategories = ["plumber", "electrician", "carpenter", "painter", "cleaner", "gardener", "other"];
            if (!allowedCategories.includes(updates.category.toLowerCase())) {
                return res.status(400).json({ message: "Invalid category" });
            }
            // capitalize first letter to match stored enum style
            updates.category = updates.category.charAt(0).toUpperCase() + updates.category.slice(1);
        }

        if (updates.dueDate) {
            const d = new Date(updates.dueDate);
            if (isNaN(d.getTime())) return res.status(400).json({ message: "Invalid dueDate" });
            updates.dueDate = d;
        }

        // Ensure client owns the task
        const task = await Task.findOne({ _id: id, createdBy: req.user.objectId });
        if (!task) return res.status(404).json({ message: "Task not found or access denied" });

        // Do not allow attachments update - ignore if present

        Object.assign(task, updates);
        await task.save();

        const sanitized = task.toObject();
        delete sanitized.createdBy;
        delete sanitized.__v;
        delete sanitized.createdAt;
        delete sanitized.updatedAt;

        return res.status(200).json({ message: "Task updated successfully", task: sanitized });
    } catch (error) {
        console.log("Error in controller/task~editTaskController", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function deleteTaskController(req, res) {
    try {
        if (req.user.role !== "client") {
            return res.status(403).json({ message: "Access denied: You are not authorized to delete tasks" });
        }
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Task id is required" });

        const task = await Task.findOne({ _id: id, createdBy: req.user.objectId });
        if (!task) return res.status(404).json({ message: "Task not found or access denied" });

        // Delete attachments from Cloudinary
        if (task.attachments && task.attachments.length > 0) {
            for (const img of task.attachments) {
                await deleteFromCloudinary(img.public_id);
            }
        }

        await Task.deleteOne({ _id: id });

        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.log("Error in controller/task~deleteTaskController", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


async function publishTaskController(req, res) {
    try {
        if (req.user.role !== "client") {
            return res.status(403).json({
                message: "Access denied: You are not authorized to create a product"
            });
        }

        if (req.fileValidationError) {
            return res.status(400).json({ message: req.fileValidationError });
        }

        const { title, description, category } = req.body;

        if (!title || !description || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // normalize category and subcategory
        const normalizedCategory = normalize(category);

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Image file is required" });
        }

        const uploadedImages = [];
        for (const file of req.files) {
            const uploaded = await uploadOnCloudinary(file.buffer, 'needhelp/tasks');
            uploadedImages.push(uploaded);
        }

        if (uploadedImages.length === 0) {
            return res.status(500).json({ message: "Failed to upload images" });
        }

        // Create product
        const task = new Task({
            title,
            description,
            category: normalizedCategory,
            attachments: uploadedImages.map(img => ({ url: img.url, public_id: img.public_id })),
            createdBy: req.user.objectId
        });

        await task.save();

        return res.status(201).json({
            status: "success",
            message: "task published successfully",
            task
        });

    } catch (error) {
        console.log("Error in controller/task~publishTaskController", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }
}

function normalize(input) {
    if (!input) return "";

    let decoded = "";
    try { decoded = decodeURIComponent(input); }
    catch { decoded = input; }

    return decoded
        .toLowerCase()
        .trim()
        .replace(/&/g, "")         // optional: remove &
        .replace(/[-_]+/g, " ")    // convert - or _ → space
        .replace(/\s+/g, " ");     // collapse spaces
}

module.exports = {
    getMyTasksController,
    publishTaskController,
    editTaskController,
    deleteTaskController

};
