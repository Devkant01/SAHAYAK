const axios = require('axios');
const { Client, Worker, Session } = require('../../models/user');
const { deleteFromCloudinary, uploadOnCloudinary } = require('../../utils/uploadImage');

async function getProfileController(req, res) {
    try {
        const model = req.user.role === 'client' ? Client : Worker;
        const user = await model.findById(req.user.objectId, { '_id': 0, 'password': 0, '__v': 0 });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({
            message: 'User profile retrieved successfully',
            user
        });
    }
    catch (err) {
        console.log("Error in controller/user~getProfileController", err);
        res.status(500).json({ error: 'Server error' });
    }
}

async function updateProfileController(req, res) {
    try {

        const model =
            req.user.role === "client"
                ? Client
                : Worker;

        const UserData = await model.findById(
            req.user.objectId
        );

        if (!UserData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const Updates = {};

        if (req.body.name?.trim()) {
            Updates.name = req.body.name.trim();
        }

        if (req.body.dateOfBirth) {
            Updates.dateOfBirth =
                req.body.dateOfBirth;
        }

        if (req.body.gender) {
            Updates.gender =
                req.body.gender;
        }

        if (
            !UserData.mail?.id &&
            req.body.mail?.trim()
        ) {
            Updates["mail.id"] =
                req.body.mail
                    .trim()
                    .toLowerCase();
        }

        if (
            !UserData.mobile?.number &&
            req.body.mobile
        ) {
            Updates["mobile.number"] =
                Number(req.body.mobile);
        }

        if (req.file) {

            const UploadedImage =
                await uploadOnCloudinary(
                    req.file.buffer,
                    "needhelp/profile"
                );

            if (!UploadedImage) {
                return res.status(500).json({
                    success: false,
                    message:
                        "Failed to upload image"
                });
            }

            Updates.image =
                UploadedImage.url;
        }

        const UpdatedUser =
            await model.findByIdAndUpdate(
                req.user.objectId,
                {
                    $set: Updates
                },
                {
                    new: true,
                    runValidators: true
                }
            );

        return res.status(200).json({
            success: true,
            message:
                "Profile updated successfully",
            user: UpdatedUser
        });

    } catch (err) {

        console.log(
            "Error in updateProfileController",
            err
        );

        return res.status(500).json({
            success: false,
            message:
                "Internal server error"
        });

    }
}

async function AddAddressController(req, res) {

    try {
        const {
            label,
            street,
            city,
            state,
            country = "India",
            zip,
            isDefault
        } = req.body;

        const model = req.user.role === 'client' ? Client : Worker;

        if (!city || !state) {
            return res.status(400).json({
                success: false,
                message: "City and state are required"
            });
        }

        const FullAddress = [
            city,
            state,
            zip,
            country
        ]
            .filter(Boolean)
            .join(", ");

        const Response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
                params: {
                    q: FullAddress,
                    format: "jsonv2",
                    limit: 1
                },
                headers: {
                    "User-Agent": "NeedHelp/1.0"
                }
            }
        );

        console.log(FullAddress);
        console.log(Response.data);

        if (!Response.data.length) {
            return res.status(404).json({
                success: false,
                message: "Unable to locate address"
            });
        }

        const Latitude = Number(Response.data[0].lat);
        const Longitude = Number(Response.data[0].lon);

        const UserData = await model.findById(req.user.objectId);

        if (!UserData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        UserData.addresses = [
            ...(Array.isArray(UserData.addresses) ? UserData.addresses : []),
            {
                label,
                street,
                city,
                state,
                country,
                zip,
                isDefault,

                location: {
                    type: "Point",
                    coordinates: [
                        Longitude,
                        Latitude
                    ]
                }
            }
        ];

        await UserData.save();
        if(isDefault) {
            UserData.defaultAddress = UserData.addresses[UserData.addresses.length - 1]._id;
            await UserData.save();
        }

        return res.status(200).json({
            success: true,
            message: "Address added successfully",
            address: UserData.addresses
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Failed to add address"
        });

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
    AddAddressController,
    updateProfileController,
    deleteProfileController,
    logoutAllSessions
};