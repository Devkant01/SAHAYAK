const app = require("express").Router();
const { upload } = require('../middlewares/multerMiddleware');
const { multerErrorHandler } = require('../controllers/client/multerErrorHandler');
const { authenticateToken } = require('../middlewares/authenticate');
const { getProfileController, AddAddressController, updateProfileController, deleteProfileController, logoutAllSessions } = require('../controllers/user/user');
/*
 */
app.get('/get-profile', authenticateToken, getProfileController);
app.post('/logout-all-sessions', authenticateToken, logoutAllSessions);
app.put('/update-profile', authenticateToken, upload.single("image"), multerErrorHandler, updateProfileController);
app.put('/add-address', authenticateToken, AddAddressController);
app.delete('/delete-profile', authenticateToken, deleteProfileController);



module.exports = app;