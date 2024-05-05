// logoutUser.js

function logoutUser(logoutButton, profileSection, registrationForm) {
    if (logoutButton) {
        logoutButton.addEventListener('click', async function() {
            console.log('Кнопка logoutButton нажата');
            try {
                const response = await fetch('http://localhost:3001/users/logout', {
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
}

export default logoutUser;
