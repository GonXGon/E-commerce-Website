const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    img: { type: String, required: true },
}, { collection: 'products' });



module.exports = mongoose.model('Product', productSchema);
