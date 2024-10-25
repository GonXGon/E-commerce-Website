const express = require("express");
const router = express.Router();
const userAddressController = require("../controllers/userAddressController");

router.post('/checkout', userAddressController.createUserAddress);

module.exports = router;