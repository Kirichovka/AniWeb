// auth.js

import loginUser from './loginUser.js';
import logoutUser from './logoutUser.js';
import registerUser from './registerUser.js';
import checkLoggedIn from './checkLoggedIn.js';

async function authenticateUser(username, password) {
    try {
        const response = await fetch('http://example.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const userData = await response.json();
            return userData; // Возвращает информацию о пользователе
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        throw error;
    }
}

export { 
    loginUser, 
    logoutUser, 
    registerUser, 
    checkLoggedIn, 
    authenticateUser 
};
