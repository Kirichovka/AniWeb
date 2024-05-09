async function registerUser({ username, email, password }) {
    try {
        const response = await fetch('http://localhost:3001/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Регистрация прошла успешно');
            return data;
        } else {
            console.error('Ошибка в ответе сервера:', data.error);
            throw new Error(data.error || 'Что-то пошло не так. Попробуйте снова.');
        }
    } catch (error) {
        console.error('Ошибка запроса:', error);
        throw error;
    }
}

export default registerUser;
