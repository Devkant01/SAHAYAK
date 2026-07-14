const jwt = require("jsonwebtoken");
// const {Client, Worker} = require("../models/user");

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    console.log("Token received:", token);
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
        req.user = decoded; //do we need entire user object or just the payload in token is enough? (we can always fetch user details from db using objectId in payload). will decided later but for now we will just attach the payload to req.user
        console.log("Authenticated successfull");
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token~Authentication' });
    }
}

module.exports = { authenticateToken };