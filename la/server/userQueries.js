const connection = require('./db');

function createUser(userData, callback) {
    connection.query('INSERT INTO users SET ?', userData, callback);
}

function getUserByEmail(email, callback) {
    connection.query('SELECT * FROM users WHERE email = ?', [email], callback);
}

function updateUser(email, newName, newEmail, callback) {
    connection.query('UPDATE users SET name = ?, email = ? WHERE email = ?', [newName, newEmail, email], callback);
}

module.exports = {
    createUser,
    getUserByEmail,
    updateUser
};
