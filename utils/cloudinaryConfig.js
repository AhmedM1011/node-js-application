const cloudinary = require('cloudinary').v2;

const cloudinaryconfig = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

module.exports = { cloudinaryconfig };

