async function loginUser({ email, password }) {
    try {
        const response = await fetch('http://localhost:3001/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Вход выполнен успешно');
            localStorage.setItem('token', data.token); // Сохраняем токен в localStorage
        } else {
            console.error('Ошибка входа:', data.error);
            alert(data.error || 'Что-то пошло не так. Попробуйте снова.');
        }
    } catch (error) {
        console.error('Ошибка запроса:', error);
        alert('Что-то пошло не так. Попробуйте снова.');
    }
}

export default loginUser;
