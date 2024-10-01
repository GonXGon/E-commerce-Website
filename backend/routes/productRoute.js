const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middleware/multer");

// router.post('/', upload.single('img'), productController.createProduct);
router.get('/products', productController.getAllProducts);

module.exports = router;