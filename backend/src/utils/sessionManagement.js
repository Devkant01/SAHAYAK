const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { generateAccessToken, generateRefreshToken } = require("./jwt");
const { Client, Worker, Session } = require("../models/user");
const { accessJwtSecret } = require("../config/config");


const sessionManagement = async (res, statusCode, user) => {
    // payload used in token should include the objectId
    const payload = {
        objectId: user._id,
        name: user.name,
        key: user.mail?.id || user.mobile?.number,
        role: user.role,
    };

    const AccessToken = generateAccessToken(payload);
    const RefreshToken = generateRefreshToken(payload);
    const refreshTokenHash = crypto
        .createHash("sha256")
        .update(RefreshToken)
        .digest("hex");

    // Save the refresh token hash in the database
    await Session.create({
        userId: user._id,
        refreshTokenHash,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });

    // Set token in HTTP-only cookie
    res.cookie("refreshToken", RefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    });

    // response data should NOT include objectId
    const data = {
        name: user.name,
        key: user.mail?.id || user.mobile?.number,
        role: user.role,
    };

    return res.status(statusCode).json({
        success: true, 
        message: "Authentication successful",
        user: data,
        accessToken: AccessToken
    });
};


module.exports = sessionManagement;