const express = require('express');
const bcrypt = require('bcrypt');
const { isLoggedIn } = require('./authMiddleware');
const { createUser, getUserByEmail } = require('./userQueries');

const router = express.Router();

module.exports = function(connection) {
    // Регистрация нового пользователя
    router.post('/register', async (req, res) => {
        try {
            const { username, email, password } = req.body;

            // Проверка на существование пользователя
            getUserByEmail(email, async (error, results) => {
                if (error) {
                    console.error('Ошибка поиска пользователя по email: ' + error);
                    return res.status(500).json({ error: 'Ошибка поиска пользователя. Пожалуйста, повторите попытку позже.' });
                }

                if (results.length > 0) {
                    return res.status(409).json({ error: 'Пользователь с данным email уже существует.' });
                }

                // Хэширование пароля
                const hashedPassword = await bcrypt.hash(password, 10);
                const userData = { username, email, password_hash: hashedPassword };

                createUser(userData, (error, results) => {
                    if (error) {
                        console.error('Ошибка создания нового пользователя: ' + error);
                        return res.status(500).json({ error: 'Ошибка создания нового пользователя. Пожалуйста, повторите попытку позже.' });
                    }
                    console.log('Новый пользователь успешно создан:', userData);
                    req.session.user = { loggedIn: true, username, email };
                    return res.json({ success: true });
                });
            });
        } catch (error) {
            console.error('Ошибка в маршруте регистрации:', error);
            return res.status(400).json({ error: error.message });
        }
    });

    // Вход пользователя
    router.post('/login', (req, res) => {
        const { email, password } = req.body;

        getUserByEmail(email, async (error, results) => {
            if (error) {
                console.error('Ошибка выполнения запроса: ' + error);
                return res.status(500).json({ error: 'Ошибка выполнения запроса. Пожалуйста, повторите попытку позже.' });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: 'Неверные учетные данные.' });
            }

            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.password_hash);

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Неверные учетные данные.' });
            }

            req.session.user = { loggedIn: true, username: user.username, email: user.email };
            res.json({ success: true });
        });
    });

    // Выход пользователя
    router.post('/logout', (req, res) => {
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
    router.get('/check', isLoggedIn, (req, res) => {
        if (req.session && req.session.user && req.session.user.loggedIn) {
            res.json(req.session.user);
        } else {
            res.status(404).json({ error: 'Пользователь не найден' });
        }
    });

    // Обновление профиля
    router.post('/update', isLoggedIn, (req, res) => {
        const { newUsername, newEmail } = req.body;
        const email = req.session.user.email;

        connection.query('UPDATE users SET username = ?, email = ? WHERE email = ?', [newUsername, newEmail, email], (error, results) => {
            if (error) {
                console.error('Ошибка обновления профиля: ' + error);
                return res.status(500).json({ error: 'Ошибка обновления профиля. Пожалуйста, повторите попытку позже.' });
            }
            console.log('Профиль пользователя успешно обновлен.');
            req.session.user.username = newUsername;
            req.session.user.email = newEmail;
            return res.json({ success: true });
        });
    });

    return router;
};
