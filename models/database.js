const mongoose = require("mongoose");

exports.databaseconnect = () => {
    mongoose
        .connect("mongodb://localhost/apimern2")
        .then(() => console.log("mongodb connected!"))
        .catch((err) => console.log(err.message));
};
