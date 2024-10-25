const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');  // Import User model

// Authentication middleware to verify JWT token
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token missing.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; 
        next();  // Proceed to next middleware or route handler
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
};

// Admin middleware to check if user is an admin
const adminMiddleware = (req, res, next) => {
    if (!req.userId) {
        return res.status(403).json({ error: 'Access denied.' });
    }

    // Fetch user from the database
    User.findById(req.userId).then(user => {
        if (user && user.isAdmin) {
            next();  // User is admin, proceed
        } else {
            return res.status(403).json({ error: 'Access denied. You are not an admin.' });
        }
    }).catch(error => {
        return res.status(500).json({ error: 'Internal server error.' });
    });
};

module.exports = { authMiddleware, adminMiddleware };
