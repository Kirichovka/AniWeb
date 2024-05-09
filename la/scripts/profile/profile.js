// Функция для получения информации о профиле пользователя
export async function getUserProfile(userId) {
    try {
        const response = await fetch(`http://localhost:3001/profile/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        if (response.ok) {
            const userProfileData = await response.json();
            return userProfileData;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.error('Ошибка при получении профиля:', error.message);
        throw error;
    }
}

// Функция для обновления информации о профиле пользователя
export async function updateProfile(newProfileData) {
    try {
        const response = await fetch('http://localhost:3001/profile/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(newProfileData)
        });

        if (response.ok) {
            const updatedProfileData = await response.json();
            return updatedProfileData;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.error('Ошибка при обновлении профиля:', error.message);
        throw error;
    }
}
