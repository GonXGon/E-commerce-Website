const UserAddress = require("../models/UserAddressModel");

const createUserAddress = async (req, res) => {
    try{
        const userAdd = new UserAddress(req.body);
        await userAdd.save();
        res.status(201).json(userAdd);
    }catch(e){
        console.error("Error creating user address:", e);
        res.status(500).json({ error: e.message });
    }
};

module.exports = {createUserAddress};