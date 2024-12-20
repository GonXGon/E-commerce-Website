const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middleware/multer");

router.post('/products', upload.single('image'), productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/detail', productController.getProductById);

module.exports = router;