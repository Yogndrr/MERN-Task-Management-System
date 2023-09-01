const Task = require('../models/taskSchema.js');

exports.taskCreate = async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            company: req.user.userId
        })
        const result = await task.save()
        res.send(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.taskDetailsbyEmployee = async (req, res) => {
    try {
        const task = await Task.findOne(
            { assignee: req.user.userId, _id: req.params.id }
        );
        if (task) {
            res.send(task);
        }
        else {
            res.send({ message: "No task found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.taskDetailsbyAdmin = async (req, res) => {
    try {
        const task = await Task.findOne(
            { company: req.user.userId, _id: req.params.id }
        );
        if (task) {
            res.send(task);
        }
        else {
            res.send({ message: "No task found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.taskListbyEmployee = async (req, res) => {
    try {
        let tasks = await Task.find({ assignee: req.user.userId })
        if (tasks.length > 0) {
            res.send(tasks)
        } else {
            res.send({ message: "No tasks found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.taskListbyAdmin = async (req, res) => {
    try {
        let tasks = await Task.find(
            { company: req.user.userId, assignee: req.params.id }
        )
        if (tasks.length > 0) {
            res.send(tasks)
        } else {
            res.send({ message: "No tasks found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updateTaskbyEmployee = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.send({ message: "Task with given id not found" });
        }

        if (task.assignee != req.user.userId) {
            return res.send({ message: "You can't update task of another user" });
        }

        task = await Task.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        res.send(task)
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.updateTaskbyAdmin = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.send({ message: "Task with given id not found" });
        }

        if (task.company != req.user.userId) {
            return res.send({ message: "You can't update task of another user" });
        }

        task = await Task.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        res.send(task)
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.deleteTaskbyEmployee = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.send({ message: "Task with given id not found" });
        }

        if (task.assignee != req.user.userId) {
            return res.send({ message: "You can't delete task of another user" });
        }

        const result = await Task.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}

exports.deleteTaskbyAdmin = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.send({ message: "Task with given id not found" });
        }

        if (task.company != req.user.userId) {
            return res.send({ message: "You can't delete task of another user" });
        }

        const result = await Task.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}

exports.deleteEmployeeTasksbyEmployee = async (req, res) => {
    try {
        const result = await Task.deleteMany(
            { assignee: req.user.userId }
        )
        if (result.deletedCount === 0) {
            res.send({ message: "No tasks found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}

exports.deleteEmployeeTasksbyAdmin = async (req, res) => {
    try {
        const result = await Task.deleteMany(
            { company: req.user.userId, assignee: req.params.id }
        )
        if (result.deletedCount === 0) {
            res.send({ message: "No tasks found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}

exports.deleteAllTasksbyAdmin = async (req, res) => {
    try {
        const result = await Task.deleteMany(
            { company: req.user.userId }
        )
        if (result.deletedCount === 0) {
            res.send({ message: "No tasks found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}