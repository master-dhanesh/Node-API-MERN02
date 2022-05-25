const { expressjwt } = require("express-jwt");

exports.isLoggedIn = expressjwt({
    getToken: (req, res) => req.cookies.token,
    secret: "abcd123",
    algorithms: ["HS256"],
}); // req.auth._id
