const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');


const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password, adminPassword } = req.body;

        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const isAdmin = adminPassword === process.env.ADMIN_PASSWORD;

        const user = new User({
            firstname,
            lastname,
            email,
            password: await bcrypt.hash(password, 10),  
            isAdmin,
        });

        await user.save();
        res.status(201).json({ user, message: 'User created successfully' });
    } catch (e) {
        console.error("Error creating user:", e.message); 
        res.status(500).json({ error: 'Internal Server Error' });
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
        const token = jwt.sign({ userId: user._id , isAdmin: user.isAdmin }, process.env.JWT_SECRET);
        res.status(200).json({ user: { ...user._doc, isAdmin: user.isAdmin }, token });
    }catch(e){
        res.status(500).json({error: e.message});
    }
}
module.exports = {createUser, findUser};