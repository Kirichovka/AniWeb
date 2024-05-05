async function checkLoggedIn() {
    const profileSection = document.getElementById('profileSection');
    const registrationForm = document.getElementById('registrationForm');

    try {
        console.log('Проверка, зарегистрирован ли пользователь');
        const response = await fetch('http://localhost:3001/users/check', {
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
            return false;  // Отмечаем как неавторизованный
        } else if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        if (data.loggedIn) {
            console.log('Пользователь уже зарегистрирован');
            if (profileSection && registrationForm) {
                profileSection.style.display = 'block';
                registrationForm.style.display = 'none';
            }
            document.getElementById('userName').innerText = data.name;
            document.getElementId('userEmail').innerText = data.email;
            return true;  // Отмечаем как авторизованный
        } else {
            console.log('Пользователь не зарегистрирован');
            if (profileSection && registrationForm) {
                profileSection.style.display = 'none';
                registrationForm.style.display = 'block';
            }
            return false;  // Отмечаем как неавторизованный
        }
    } catch (error) {
        console.error('Ошибка проверки пользователя:', error);
        if (profileSection && registrationForm) {
            profileSection.style.display = 'none';
            registrationForm.style.display = 'block';
        }
        return false;  // Отмечаем как неавторизованный
    }
}

export default checkLoggedIn;