const jwt = require("jsonwebtoken");
const { accessJwtSecret, refreshJwtSecret } = require("../config/config");

const generateAccessToken = (payload) => {
    return jwt.sign(payload, accessJwtSecret, {
        expiresIn: "15m"
    });
};

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, refreshJwtSecret, {
        expiresIn: "30d"
    });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
};