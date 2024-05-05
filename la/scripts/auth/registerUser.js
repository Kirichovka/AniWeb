// registerUser.js

async function registerUser(registrationForm, profileSection) {
    if (registrationForm) {
        registrationForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');

            const name = nameInput.value;
            const email = emailInput.value;
            const password = passwordInput.value;

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
                    registrationForm.style.display = 'none';
                    profileSection.style.display = 'flex';
                    document.getElementById('userName').innerText = name;
                    document.getElementById('userEmail').innerText = email;
                    nameInput.value = '';
                    emailInput.value = '';
                    passwordInput.value = '';
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

export default registerUser;
