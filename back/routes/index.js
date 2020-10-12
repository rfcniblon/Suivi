const express = require('express');
const router = express.Router();

const users = require("./users");
const register = require("./register");
const login = require('./login');
const token = require("./token");

router.use("/users", users);
router.use("/register", register);
router.use("/login", login);
router.use("/token", token);

module.exports = router;
