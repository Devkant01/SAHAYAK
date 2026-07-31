const app = require("express").Router();
const { upload } = require('../middlewares/multerMiddleware');
const { authenticateToken } = require('../middlewares/authenticate');
const { multerErrorHandler } = require('../controllers/client/multerErrorHandler');
const { getAIDescriptionController } = require('../controllers/ai/aiController');

app.post("/get-description", authenticateToken, upload.array('attachments', 5), multerErrorHandler, getAIDescriptionController);
app.get("/hi", (req, res) => {
    res.send("Hello from AI route!");
});
module.exports = app; 