const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/temp');
    },
    filename: (req, file, cb) => {
        // const uniqe=Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname);
    }
});

const ProductUpload = multer({ storage });

module.exports = { ProductUpload };
