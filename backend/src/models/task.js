const { mongoose } = require("../config/db");
const { Client, Worker } = require("./user");

// console.log("Task loaded by:", module.parent?.filename);

const ImageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    public_id: { type: String, required: true },
});

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }, 
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'awaiting_review', 'completed'],
        default: 'pending'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },

    category: {
        type: String,
        enum: ["plumber", "electrician", "carpenter", "painter", "cleaner", "gardener", "other"],
        trim: true
    },
    attachments: [ImageSchema],
    acceptedAt: Date,
    completedAt: Date
}, { timestamps: true });
// console.log("Task: Loading Task model");
// console.log(mongoose.modelNames());
const Task = mongoose.model("Task", taskSchema);

module.exports = {
    Task
}