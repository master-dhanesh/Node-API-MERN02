const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const userModel = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name field must not be empty"],
            minlength: [4, "Name should have atleast 4 characters"],
        },
        password: {
            type: String,
            required: [true, "Password field must not be empty"],
            minlength: [6, "Password should have atleast 6 characters"],
            select: false,
        },
        email: {
            type: String,
            required: [true, "Password field must not be empty"],
            validate: [validator.isEmail, "Invalid email"],
            unique: true,
        },
    },
    { timestamps: true }
);

const user = mongoose.model("User", userModel);

module.exports = user;
