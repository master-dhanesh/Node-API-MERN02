var express = require("express");
const { findOne } = require("../models/userModel");
var router = express.Router();

const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const { hashPassword, comparepassword } = require("../utils");
const { isLoggedIn } = require("../middleware");

/* /user/ */

//users
router.get("/", isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findById(req.auth._id).exec();
        res.json({ message: "this is authenticated page.", user });
    } catch (err) {
        res.status(500).send(err);
    }
});

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

    const token = jwt.sign({ _id: user._id }, "abcd123", {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        // secure: true // https
    });

    res.status(200).json({ message: "Log in successfull", token });
});

//logout
router.get("/logout", isLoggedIn, (req, res, next) => {
    res.clearCookie("token");
    res.send("User logged out!");
});

module.exports = router;
