const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const errorHandler = require('./errorHandler');
const connection = require('./db');
const { isLoggedIn } = require('./authMiddleware');
const userRoutes = require('./usersRoutes');

const app = express();

// Настройка CORS
const corsOptions = {
    origin: '*',
    methods: "GET,POST,OPTIONS,PUT,PATCH,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Настройка сессии
const sessionStore = new MySQLStore({}, connection);
app.use(session({
    key: 'user_sid',
    secret: 'supersecret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 // 1 час
    }
}));

// Маршрут для статических файлов (CSS, JS и т.д.)
app.use(express.static('scripts'));
app.use(express.static('client'));

// Использовать роутеры
app.use('/users', userRoutes(connection));
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
