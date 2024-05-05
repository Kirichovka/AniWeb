// submitRegistrationForm.js

import { loginUser } from '../auth/auth.js';

async function submitRegistrationForm(profileSection) {
    const registrationForm = document.getElementById('registrationForm');

    if (registrationForm) {
        registrationForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:3001/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('Регистрация прошла успешно');
                    loginUser(email, password); // Автоматический вход после успешной регистрации
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
}

export default submitRegistrationForm;
