const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "client",
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Employee"
    }
});

module.exports = mongoose.model("employee", employeeSchema)