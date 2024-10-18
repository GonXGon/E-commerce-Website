const multer = require("multer");
const path = require("path");

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Ensure this is a valid folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
    }
});

const upload = multer({ storage });

module.exports = upload;
