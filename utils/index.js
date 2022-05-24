const bcrypt = require("bcryptjs");

exports.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

exports.comparepassword = (password, dbpassword) => {
    return bcrypt.compareSync(password, dbpassword);
};
