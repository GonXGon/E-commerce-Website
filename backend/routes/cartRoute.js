const express = require("express");
const router = express.Router();
const { addToCart, removeFromCart, getUserCart, updateCartQuantity} = require("../controllers/cartController");
const authMiddleware = require("../middleware/auth");

router.post('/cart', authMiddleware, addToCart);  
router.delete('/cart/:productId', authMiddleware, removeFromCart);
router.put('/cart/quantity', authMiddleware, updateCartQuantity);
router.get('/cart', authMiddleware, getUserCart);

module.exports = router;
