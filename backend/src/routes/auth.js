const app = require("express").Router();
const { registerController, loginController, logoutController } = require('../controllers/auth/auth');
const { authenticateToken } = require('../middlewares/authenticate');
const { refreshToken } = require('../controllers/auth/tokenRotation');
/*
 */
app.post('/register', registerController);
app.post('/login', loginController);
app.post('/logout', logoutController);
app.post('/refresh-token', refreshToken);



module.exports = app;