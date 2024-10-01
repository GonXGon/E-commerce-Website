const Product = require("../models/ProductModel");

const createProduct = async(req, res) => {
    try{
        const { name, price, description, category, quantity } = req.body;
        const newProduct = new Product({
            name, price, description, category, quantity,
            img: req.file.path,
        });

        const product = await newProduct.save();
        res.status(201).json(product);
    }catch(e){
        res.status(500).json({error: e.message});
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

module.exports = {createProduct, getAllProducts};