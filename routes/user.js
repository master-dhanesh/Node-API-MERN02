var express = require("express");
const { findOne } = require("../models/userModel");
var router = express.Router();

const User = require("../models/userModel");

const { hashPassword, comparepassword } = require("../utils");

/* /user/ */

// register
router.post("/register", async function (req, res, next) {
    try {
        const { name, email, password } = req.body;

        const existing = await User.findOne({ email }).exec();
        if (existing) return res.status(401).send("Duplicate User Found.");

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashPassword(password),
        });

        res.status(201).json({ ok: true });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// login
router.post("/login", async function (req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password").exec();
    if (!user) return res.status(404).send("User Not Found.");

    const matchpassword = comparepassword(password, user.password);

    if (!matchpassword)
        return res.status(404).send("invalid email or password.");

    user.password = undefined;
    res.status(200).json(user);
});

module.exports = router;
