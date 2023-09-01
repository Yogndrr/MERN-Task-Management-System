const bcrypt = require('bcrypt');
const Employee = require('../models/employeeSchema.js');
const { createNewToken } = require('../utils/token.js');

exports.employeeRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const employee = new Employee({
            ...req.body,
            company: req.user.userId,
            password: hashedPass
        });

        const existingEmployeeByEmail = await Employee.findOne({ email: req.body.email });

        if (existingEmployeeByEmail) {
            res.send({ message: 'Email already exists' });
        } else {
            let result = await employee.save();
            result.password = undefined;
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.employeeLogIn = async (req, res) => {
    if (req.body.email && req.body.password) {
        let employee = await Employee.findOne({ email: req.body.email });
        if (employee) {
            const validated = await bcrypt.compare(req.body.password, employee.password);
            if (validated) {
                employee.password = undefined;

                const token = createNewToken(employee._id)

                employee = {
                    ...employee._doc,
                    token: token
                };

                res.send(employee);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "Employee not found" });
        }
    } else {
        res.send({ message: "Email and password are required" });
    }
};

exports.getEmployeeDetail = async (req, res) => {
    try {
        let employee = await Employee.findById(req.user.userId)
        if (employee) {
            employee.password = undefined;
            res.send(employee);
        }
        else {
            res.send({ message: "No employee found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.findEmployee = async (req, res) => {
    try {
        let employee = await Employee.findOne({ company: req.user.userId, _id: req.params.id })
        if (employee) {
            employee.password = undefined;
            res.send(employee);
        }
        else {
            res.send({ message: "No employee found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.getEmployees = async (req, res) => {
    try {
        let employees = await Employee.find({ company: req.user.userId })
        if (employees.length > 0) {
            let modifiedEmployees = employees.map((student) => {
                return { ...student._doc, password: undefined };
            });
            res.send(modifiedEmployees);
        } else {
            res.send({ message: "No employees found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};