document.addEventListener("DOMContentLoaded", function() {
    console.log('DOM загружен и разобран');

    var profileSection = document.getElementById('profileSection');
    var editProfileForm = document.getElementById('editProfileForm');
    var editProfileButton = document.getElementById('editProfileButton');
    var cancelButton = document.getElementById('cancelButton');
    var saveChangesButton = document.getElementById('saveChangesButton');
    var logoutButton = document.getElementById('logoutButton');
    var newNameInput = document.getElementById('newName');
    var newEmailInput = document.getElementById('newEmail');
    var modal = document.getElementById('modal');
    var userInfo = document.getElementById('userInfo');
    var closeButton = document.querySelector('.close-button');
    var registrationForm = document.getElementById('registrationForm');
    var modalOpened = false;

    console.log('Установка обработчиков событий');

    // Проверка регистрации пользователя
    async function checkLoggedIn() {
        try {
            console.log('Проверка, зарегистрирован ли пользователь');
            var response = await fetch('http://localhost:3001/users/check', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 401) {
                console.log('Пользователь не авторизован');
                if (profileSection && registrationForm) {
                    profileSection.style.display = 'none';
                    registrationForm.style.display = 'block';
                }
                return;
            } else if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            var data = await response.json();
            if (data.loggedIn) {
                console.log('Пользователь уже зарегистрирован');
                if (profileSection && registrationForm) {
                    profileSection.style.display = 'block';
                    registrationForm.style.display = 'none';
                }
                document.getElementById('userName').innerText = data.name;
                document.getElementById('userEmail').innerText = data.email;
            } else {
                console.log('Пользователь не зарегистрирован');
                if (profileSection && registrationForm) {
                    profileSection.style.display = 'none';
                    registrationForm.style.display = 'block';
                }
            }
        } catch (error) {
            console.error('Ошибка проверки пользователя:', error);
            if (profileSection && registrationForm) {
                profileSection.style.display = 'none';
                registrationForm.style.display = 'block';
            }
        }
    }

    // Проверка регистрации при загрузке страницы
    checkLoggedIn();

    // Открыть модальное окно при клике на userInfo, если пользователь не зарегистрирован
    if (userInfo && modal) {
        userInfo.addEventListener('click', function() {
            console.log('userInfo нажата');
            if (!modalOpened && registrationForm && registrationForm.style.display === 'block') {
                console.log('Открытие модального окна');
                modal.style.display = 'flex';
                modal.classList.add('open');
                modalOpened = true;
            }
        });
    }

    // Закрыть модальное окно
    if (closeButton && modal) {
        closeButton.addEventListener('click', function() {
            console.log('Кнопка closeButton нажата');
            console.log('Закрытие модального окна');
            modal.classList.remove('open');
            setTimeout(function() {
                modal.style.display = 'none';
                modalOpened = false;
            }, 400);
        });
    }

    // Отправка формы регистрации
    if (registrationForm) {
        registrationForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;

            try {
                var response = await fetch('http://localhost:3001/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                });

                var data = await response.json();

                if (response.ok) {
                    console.log('Регистрация прошла успешно');
                    registrationForm.style.display = 'none';
                    profileSection.style.display = 'block';
                    document.getElementById('userName').innerText = name;
                    document.getElementById('userEmail').innerText = email;
                    document.getElementById('name').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('password').value = '';
                } else {
                    console.error('Ошибка в ответе сервера:', data.error);
                    alert(data.error || "Что-то пошло не так. Попробуйте снова.");
                }
            } catch (error) {
                console.error('Ошибка запроса:', error);
                alert('Что-то пошло не так. Попробуйте снова.');
            }
        });
    }

    // Показать форму редактирования профиля
    if (editProfileButton) {
        editProfileButton.addEventListener('click', function() {
            console.log('Кнопка editProfileButton нажата');
            profileSection.style.display = 'none';
            editProfileForm.style.display = 'block';
            newNameInput.value = document.getElementById('userName').innerText;
            newEmailInput.value = document.getElementById('userEmail').innerText;
        });
    }

    // Отменить редактирование профиля
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            console.log('Кнопка cancelButton нажата');
            profileSection.style.display = 'block';
            editProfileForm.style.display = 'none';
        });
    }

    // Сохранить изменения профиля
    if (saveChangesButton) {
        saveChangesButton.addEventListener('click', async function() {
            console.log('Кнопка saveChangesButton нажата');
            var newName = newNameInput.value;
            var newEmail = newEmailInput.value;

            try {
                var response = await fetch('http://localhost:3001/users/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ newName, newEmail })
                });

                var data = await response.json();

                if (response.ok) {
                    console.log('Изменения сохранены успешно');
                    document.getElementById('userName').innerText = newName;
                    document.getElementById('userEmail').innerText = newEmail;
                    profileSection.style.display = 'block';
                    editProfileForm.style.display = 'none';
                    alert('Изменения сохранены успешно.');
                } else {
                    console.error('Ошибка в ответе сервера:', data.error);
                    alert(data.error || "Что-то пошло не так. Попробуйте снова.");
                }
            } catch (error) {
                console.error('Ошибка запроса:', error);
                alert('Что-то пошло не так. Попробуйте снова.');
            }
        });
    }

    // Кнопка выхода
    if (logoutButton) {
        logoutButton.addEventListener('click', async function() {
            console.log('Кнопка logoutButton нажата');
            try {
                var response = await fetch('http://localhost:3001/users/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    console.log('Выход успешен');
                    profileSection.style.display = 'none';
                    registrationForm.style.display = 'block';
                } else {
                    console.error('Ошибка выхода');
                    alert("Не удалось выйти. Попробуйте снова.");
                }
            } catch (error) {
                console.error('Ошибка запроса на выход:', error);
                alert("Не удалось выйти. Попробуйте снова.");
            }
        });
    }

    window.onclick = function(event) {
        if (event.target === modal && modalOpened) {
            console.log('Щелчок за пределами модального окна');
            console.log('Закрытие модального окна');
            modal.classList.remove('open');
            setTimeout(function() {
                modal.style.display = 'none';
                modalOpened = false;
            }, 400);
        }
    };

    // Отправка пользовательской формы
    var userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Отправка формы');

            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;

            console.log('Полученные данные:');
            console.log('Имя:', name);
            console.log('Email:', email);

            var userData = {
                name: name,
                email: email,
                password: password
            };

            fetch('http://localhost:3001/users/check', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Ответ от сервера:', data);
            })
            .catch(error => {
                console.error('Ошибка отправки данных на сервер:', error);
                alert('Произошла ошибка при отправке данных на сервер. Пожалуйста, повторите попытку позже.');
            });
        });
    }
});

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
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

// Подключение к базе данных MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Admin',
    password: 'michurinA121102081948I',
    database: 'usersData'
});

connection.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных: ' + err.stack);
        return;
    }

    console.log('Подключение к базе данных успешно, id ' + connection.threadId);

    // Проверка наличия таблицы users
    connection.query('SHOW TABLES LIKE "users"', (error, results, fields) => {
        if (error) {
            console.error('Ошибка выполнения запроса: ' + error);
            return;
        }

        if (results.length === 0) {
            // Таблица не существует, создаем её
            createUsersTable();
        } else {
            console.log('Таблица users уже существует.');
        }
    });
});

// Функция для создания таблицы users
function createUsersTable() {
    connection.query(`CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
    )`, (error, results, fields) => {
        if (error) {
            console.error('Ошибка создания таблицы users: ' + error);
            return;
        }

        console.log('Таблица users успешно создана.');
    });
}

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

// Middleware для проверки, если пользователь вошел в систему
function isLoggedIn(req, res, next) {
    if (req.session.user && req.session.user.loggedIn) {
        next();
    } else {
        res.status(401).json({ error: 'Необходимо войти в систему.' });
    }
}

// Регистрация нового пользователя
app.post('/users/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            name,
            email,
            password: hashedPassword
        };

        connection.query('INSERT INTO users SET ?', userData, (error, results, fields) => {
            if (error) {
                console.error('Ошибка создания нового пользователя: ' + error);
                return res.status(500).json({ error: 'Ошибка создания нового пользователя. Пожалуйста, повторите попытку позже.' });
            }

            console.log('Новый пользователь успешно создан:', userData); 
            req.session.user = {
                loggedIn: true,
                name,
                email
            };
            return res.json({ success: true });
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Вход пользователя
app.post('/users/login', (req, res) => {
    const { email, password } = req.body;

    connection.query('SELECT * FROM users WHERE email = ?', [email], async (error, results, fields) => {
        if (error) {
            console.error('Ошибка выполнения запроса: ' + error);
            return res.status(500).json({ error: 'Ошибка выполнения запроса. Пожалуйста, повторите попытку позже.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Неверные учетные данные.' });
        }

        const user = results[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Неверные учетные данные.' });
        }

        req.session.user = {
            loggedIn: true,
            name: user.name,
            email: user.email
        };

        res.json({ success: true });
    });
});

// Выход пользователя
app.post('/users/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Ошибка выхода:', err);
            return res.status(500).json({ error: 'Ошибка выхода. Пожалуйста, повторите попытку позже.' });
        }

        res.clearCookie('user_sid');
        res.json({ success: true });
    });
});

// Проверка состояния пользователя
app.get('/users/check', isLoggedIn, (req, res) => {
    if (req.session && req.session.user && req.session.user.loggedIn) {
        res.json(req.session.user);
    } else {
        res.status(404).json({ error: 'Пользователь не найден' });
    }
});

// Обновление профиля
app.post('/users/update', isLoggedIn, (req, res) => {
    const { newName, newEmail } = req.body;

    connection.query('UPDATE users SET name = ?, email = ? WHERE email = ?', [newName, newEmail, req.session.user.email], (error, results, fields) => {
        if (error) {
            console.error('Ошибка обновления профиля: ' + error);
            return res.status(500).json({ error: 'Ошибка обновления профиля. Пожалуйста, повторите попытку позже.' });
        }

        console.log('Профиль пользователя успешно обновлен.'); 
        req.session.user.name = newName;
        req.session.user.email = newEmail;
        return res.json({ success: true });
    });
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error('Ошибка: ', err.message);
    res.status(500).json({ error: 'Что-то пошло не так! Пожалуйста, повторите попытку позже.' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
