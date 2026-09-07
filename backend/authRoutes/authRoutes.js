const express = require('express');
const router = express.Router();
const login = require('./login.js');
const signUp = require("./signUp.js");
const { verifyToken } = require("../authRoutes/jwtToken.js");


router.post('/login',login);
router.post("/sign-up", signUp);
router.post("/authenticate", verifyToken);

module.exports = router;