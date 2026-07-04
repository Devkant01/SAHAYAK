const { Client, Worker, Session } = require('../../models/user');

async function getProfileController(req, res) {
    try {
        const model = req.user.role === 'client' ? Client : Worker;
        const user = await model.findById(req.user.objectId, {'_id': 0, 'password': 0, '__v': 0});
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({
            message: 'User profile retrieved successfully',
            user: {
                objectId: user._id,
                name: user.name,
                key: user.mail?.id || user.mobile?.number,
                role: user.role,
                image: user.image || null
            }
        });
    }
    catch (err) {
        console.log("Error in controller/user~getProfileController", err);
        res.status(500).json({ error: 'Server error' });
    }
}

async function updateProfileController(req, res) {
    try {
        const updates = req.body?.data || req.body;
        if (!updates || typeof updates !== 'object' || !Object.keys(updates).length) {
            return res.status(400).json({ error: 'Update data is required' });
        }
        const model = req.user.role === 'client' ? Client : Worker;
        const updatedUser = await model.findByIdAndUpdate(req.user.objectId, updates, {
            new: true, runValidators: true
        });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({
            user: {
                objectId: updatedUser._id,
                name: updatedUser.name,
                key: updatedUser.mail?.id || updatedUser.mobile?.number,
                role: updatedUser.role,
                image: updatedUser.image || null
            }
        });
    } catch (err) {
        console.log("Error in controller/user~updateProfileController", err);
        res.status(500).json({ error: 'Server error' });
    }
}

async function deleteProfileController(req, res) {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ error: 'Password is required to delete profile' });
    }
    try {
        await Session.deleteMany({ userId: req.user.objectId });
        const model = req.user.role === 'client' ? Client : Worker;
        const deletedUser = await model.findByIdAndDelete(req.user.objectId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'strict' });
        res.status(200).json({ message: 'User profile deleted successfully' });
    } catch (err) {
        console.log("Error in controller/user~deleteProfileController", err);
        res.status(500).json({ error: 'Server error' });
    }
}

async function logoutAllSessions(req, res) {
    try {
        await Session.deleteMany({ userId: req.user.objectId });
        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'strict' });
        res.status(200).json({ message: 'Logged out from all sessions successfully' });
    } catch (err) {
        console.log("Error in controller/user~logoutAllSessions", err);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    getProfileController,
    updateProfileController,
    deleteProfileController,
    logoutAllSessions
};