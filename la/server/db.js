const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Admin',
    password: 'michurinA121102081948I',
    database: 'users_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных: ' + err.stack);
        return;
    }
    console.log('Подключение к базе данных успешно, id ' + connection.threadId);
});

module.exports = connection;
