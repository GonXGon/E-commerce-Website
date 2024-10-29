const mongoose = require('mongoose');
const { Schema } = mongoose;

const userAddressSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
},{ collection: 'usersAddress' })

module.exports = mongoose.model('usersAddress', userAddressSchema);