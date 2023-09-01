const bcrypt = require('bcrypt');
const Admin = require('../models/adminSchema.js');
const { createNewToken } = require('../utils/token.js');

exports.adminRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const admin = new Admin({
            ...req.body,
            password: hashedPass
        });

        const existingAdminByEmail = await Admin.findOne({ email: req.body.email });

        if (existingAdminByEmail) {
            res.send({ message: 'Email already exists' });
        } else {
            let result = await admin.save();
            result.password = undefined;

            const token = createNewToken(result._id)

            result = {
                ...result._doc,
                token: token
            };

            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.adminLogIn = async (req, res) => {
    if (req.body.email && req.body.password) {
        let admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
            const validated = await bcrypt.compare(req.body.password, admin.password);
            if (validated) {
                admin.password = undefined;

                const token = createNewToken(admin._id)

                admin = {
                    ...admin._doc,
                    token: token
                };

                res.send(admin);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "Admin not found" });
        }
    } else {
        res.send({ message: "Email and password are required" });
    }
};

exports.getAdminDetail = async (req, res) => {
    try {
        let admin = await Admin.findById(req.user.userId)
        if (admin) {
            admin.password = undefined;
            res.send(admin);
        }
        else {
            res.send({ message: "No admin found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}