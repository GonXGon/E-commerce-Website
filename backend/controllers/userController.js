const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try{
        const user = new User(req.body);
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        res.status(201).json(user);
    }catch(e){
        res.status(500).json({error: e.message});
    }
};

const findUser = async (req, res) => {
    try{
        const {email, password } = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({error: "Invalid credentials"});
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ user, token});
    }catch(e){
        res.status(500).json({error: e.message});
    }
}
module.exports = {createUser, findUser};