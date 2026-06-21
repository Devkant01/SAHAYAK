const app = require("express").Router();
const { authenticateToken } = require('../middlewares/authenticate');
const { getProfileController, updateProfileController, deleteProfileController, logoutAllSessions } = require('../controllers/user/user');
/*
 */
app.get('/get-profile', authenticateToken, getProfileController);
app.post('/logout-all-sessions', authenticateToken, logoutAllSessions);
app.put('/update-profile', authenticateToken, updateProfileController);
app.delete('/delete-profile', authenticateToken, deleteProfileController);



module.exports = app;