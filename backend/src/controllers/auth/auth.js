const bcrypt = require('bcrypt');
const crypto = require("crypto");
const { Client, Worker, Session } = require('../../models/user');
const { pswSaltRounds } = require('../../config/config');
const sessionManagement = require('../../utils/sessionManagement');

//register
async function registerController(req, res) {
    const { name, mail, mobile, password, role } = req.body;

    if (!name || !password || (!mail && !mobile) || !role) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const model = role === 'client' ? Client : Worker;
    try {
        const existingUser = await model.findOne(mobile ? { 'mobile.number': mobile } : { 'mail.id': mail });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, Number(pswSaltRounds));

        // Create and save the new user
        const newUser = new model({
            name,
            ...(mobile ? { 'mobile.number': mobile } : { 'mail.id': mail }),
            password: hashedPassword
        });
        const user = await newUser.save();

        // Generate token and set session
        await sessionManagement(res, 201, user);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
        console.log("Error in controller/auth~registerController", err);
    }
}

//login
async function loginController(req, res) {
    const { mail, mobile, password, role } = req.body;
    if (!password || (!mail && !mobile) || !role) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const model = role === 'client' ? Client : Worker;
    try {
        const user = await model.findOne(mobile ? { 'mobile.number': mobile } : { 'mail.id': mail });
        if (!user) {
            return res.status(400).json({ error: `User not found with these credentials. Invalid ${mobile ? 'mobile' : 'mail'}` });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate token and set session
        await sessionManagement(res, 200, user);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
        console.log("Error in controller/auth~loginController", err);
    }
}

//logout (don't know it's bug or what: when i call logout api with no refresh token in cookie, it returns success response)
async function logoutController(req, res) {
    try {
        const Token = req.cookies.refreshToken;
        if (!Token) {
            res.clearCookie(
                "refreshToken",
                {
                    httpOnly: true,
                    secure:
                        process.env.NODE_ENV ===
                        "production",
                    sameSite: "strict"
                }
            );

            return res.status(200).json({
                success: true,
                message:
                    "Logged out successfully"
            });
        }

        const RefreshTokenHash =
            crypto
                .createHash("sha256")
                .update(Token)
                .digest("hex");

        await Session.deleteOne({
            refreshTokenHash:
                RefreshTokenHash
        });

        res.clearCookie(
            "refreshToken",
            {
                httpOnly: true,
                secure:
                    process.env.NODE_ENV ===
                    "production",
                sameSite: "strict"
            }
        );

        return res.status(200).json({
            success: true,
            message:
                "Logged out successfully"
        });

    } catch (err) {

        console.log("Error in logoutController",err);

        return res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
}

module.exports = {
    loginController,
    registerController,
    logoutController
}