const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Configuration
cloudinary.config({
    cloud_name: "dwxdlo1qq",
    api_key: "868445965284911",
    api_secret: "b5RRPdiKg4839BNNnM88tKCb2QM",
});

const uploadOnCludinary = async (path) => {
    try {
        const result = await cloudinary.uploader.upload(path, {
            resource_type: "auto",
        });
        console.log(result.secure_url);
        return result.secure_url;
    } catch (error) {
        console.log(error);
    } finally {
        fs.unlink(path, function (err) {
            if (err) {
                console.log("unlink failed", err);
            }
        });
    }
};

module.exports = uploadOnCludinary;
