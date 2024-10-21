const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    }catch(e){
        console.error('Could not connect to MongoDB:', e.message);
        process.exit(1);
    }
};

module.exports = connectDB;