const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post('/signUp', userController.createUser);
router.post('/login', userController.findUser);

module.exports = router;