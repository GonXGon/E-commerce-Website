const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;  
        const userId = req.userId;  

        if (!userId) {
            return res.status(400).json({ error: "User ID is missing." });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found." });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [], total: 0 });
        }

        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (productIndex >= 0) {
            cart.items[productIndex].quantity += quantity;
        } else {

            cart.items.push({
                name: product.name,
                price: product.price,
                productId: product._id,
                quantity: quantity,
                img: product.img
            });
        }

        cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        await cart.save();
        res.status(200).json(cart);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const removeFromCart = async(req, res) => {
    try{
        const {productId} = req.params;
        const userId = req.userId; 

        let cart = await Cart.findOne({userId});

        if(!cart){
            return res.status(404).json({error: "Cart not found"});
        }
        cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

        const total = await Promise.all(
            cart.items.map(async (item) => {
                const product = await Product.findById(item.productId);
                return product.price * item.quantity;
            })
        ).then(prices => prices.reduce((acc, price) => acc + price, 0));

        cart.total = total;

        await cart.save();
        res.status(200).json(cart);
    }catch (e){
        res.status(500).json({error: e.message});
    }
};

const updateCartQuantity = async (req, res) => {
    try{
        const {productId, quantity} = req.body;
        const userId = req.userId;

        //find user'cart
        let cart = await Cart.findOne({userId});
        if(!cart){
            return res.status(404).json({error: "Cart Not Found"});
        }

        //find product in cart $ update the quantity
        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if(productIndex >= 0){
            cart.items[productIndex].quantity = quantity;
        }else{
            return res.status(404).json({error: "Product not found in cart"});
        }

        cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        await cart.save();

        res.status(200).json(cart);
    }catch(e){
        res.status(500).json({error: e.message});
    }
}

const getUserCart = async (req, res) => {
    try {
        const userId = req.userId;  
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

module.exports = {addToCart, removeFromCart, updateCartQuantity, getUserCart};