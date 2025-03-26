const users = require("./db/users");

function findUser(userId) {
    // Find user with id = userId
    const user = users.find((user) => user.id === parseInt(userId));

    return user;
}

module.exports = { findUser };
