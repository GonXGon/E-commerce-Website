const Product = require("../models/ProductModel");

const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, quantity } = req.body;
        const image = req.file ? req.file.path.replace("\\", "/") : null; 

        const product = new Product({ 
            name, 
            price, 
            description, 
            category, 
            quantity, 
            img: image 
        });

        await product.save();
        res.status(201).json(product);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find();
        res.status(200).json(products);
    }catch(e){
        res.status(500).json({error: e.message});
    }
}
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.query.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

module.exports = {createProduct, getAllProducts, getProductById};