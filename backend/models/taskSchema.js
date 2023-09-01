const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "client",
        required: true
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    taskStatus: {
        type: String,
        required: true,
    }
}, { timestamps: true }
);

module.exports = mongoose.model("task", taskSchema)