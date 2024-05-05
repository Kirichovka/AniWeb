// profile.js

// Функция для получения информации о профиле пользователя
export async function getUserProfile(userId) {
    try {
        const response = await fetch(`http://example.com/profile/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        if (response.ok) {
            const userProfileData = await response.json();
            return userProfileData; // Возвращает информацию о профиле пользователя
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        throw error;
    }
}

// Функция для обновления информации о профиле пользователя
export async function updateProfile(newProfileData) {
    try {
        const response = await fetch('http://example.com/profile/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(newProfileData)
        });

        if (response.ok) {
            const updatedProfileData = await response.json();
            return updatedProfileData; // Возвращает обновленную информацию о профиле пользователя
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        throw error;
    }
}
