const express = require("express");
const router = express.Router();
const User = require('../models/UserModel');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.get('/profile', authMiddleware, async (req, res) => {
    try{
        const user = await User.findById(req.userId).select('-password');
        if(!user){
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});
router.get('/admin', authMiddleware, adminMiddleware, (req, res) => {
    res.send('Welcome to the admin dashboard!');
});

module.exports = router;