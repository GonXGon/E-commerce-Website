const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
},{ collection: 'users' })

module.exports = mongoose.model('User', userSchema);