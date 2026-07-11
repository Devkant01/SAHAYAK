// utils/cloudinary.js
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const { cloudName, cloudApiKey, cloudApiSecret } = require("../config/config");

cloudinary.config({
    cloud_name: cloudName,
    api_key: cloudApiKey,
    api_secret: cloudApiSecret,
    secure: true,
});

// console.log(cloudinary.config());

function uploadOnCloudinary(fileBuffer, folder = "needhlep/tasks") {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder, resource_type: "auto" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
}

async function deleteFromCloudinary(public_id) {
    try {
        if (!public_id) return null;
        return await cloudinary.uploader.destroy(public_id);
    } catch (error) {
        console.log("Cloudinary delete error:", error.message);
        return null;
    }
}

module.exports = { uploadOnCloudinary, deleteFromCloudinary };
