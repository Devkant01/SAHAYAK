const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Client, Worker, Session } = require('../../models/user');
const { accessJwtSecret, refreshJwtSecret } = require('../../config/config');
const { generateAccessToken, generateRefreshToken } = require('../../utils/jwt');

async function refreshToken(req, res) {
    const token = req.cookies.refreshToken;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const RefreshTokenHash =
            crypto
                .createHash("sha256")
                .update(token)
                .digest("hex");
        
        const SessionData =
            await Session.findOne({
                refreshTokenHash: RefreshTokenHash
            });

        if (!SessionData) {
            return res.status(401).json({
                error: "Session not found"
            });
        }

        const decoded =
            jwt.verify(
                token,
                refreshJwtSecret
            );

        const model =
            decoded.role === "client"
                ? Client
                : Worker;

        const user =
            await model.findById(
                decoded.objectId
            );

        if (!user) {
            return res.status(401).json({
                error: "Invalid token"
            });
        }

        const payload = {
            objectId: user._id,
            name: user.name,
            key:
                user.mail?.id ||
                user.mobile?.number,
            role: user.role
        };

        const NewAccessToken =
            generateAccessToken(
                payload
            );

        return res.status(200).json({
            success: true,
            accessToken:
                NewAccessToken
        });

    } catch (err) {

        return res.status(401).json({
            error: "Invalid token"
        });
    }
}



module.exports = { refreshToken };