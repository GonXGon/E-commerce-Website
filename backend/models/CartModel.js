const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true, default: 1 },
            name:{type: String, required: true},
            price:{type: Number, required: true},
            img: { type: String, required: true },
        }
    ],
    total: { type: Number, required: true, default: 0 },
    updatedAt: { type: Date, default: Date.now },
}, { collection: 'carts' });

module.exports = mongoose.model('Cart', cartSchema);
