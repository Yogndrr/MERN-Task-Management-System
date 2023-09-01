const jwt = require("jsonwebtoken");

const createNewToken = (payload) => {
    return jwt.sign({ userId: payload }, process.env.SECRET_KEY, { expiresIn: '1d' });
}

module.exports = { createNewToken }