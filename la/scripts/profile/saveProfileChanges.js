function saveProfileChanges(saveChangesButton, newNameInput, newEmailInput, profileSection, editProfileForm) {
    if (saveChangesButton && newNameInput && newEmailInput && profileSection && editProfileForm) {
        saveChangesButton.addEventListener('click', async function() {
            console.log('Кнопка saveChangesButton нажата');
            const newName = newNameInput.value;
            const newEmail = newEmailInput.value;

            if (!newName || !newEmail) {
                alert('Имя и Email не могут быть пустыми.');
                return;
            }

            try {
                const response = await fetch('http://localhost:3001/users/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify({ newName, newEmail })
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('Изменения сохранены успешно');
                    document.getElementById('userName').innerText = newName;
                    document.getElementById('userEmail').innerText = newEmail;
                    profileSection.style.display = 'block';
                    editProfileForm.style.display = 'none';
                    alert('Изменения сохранены успешно.');
                } else {
                    console.error('Ошибка в ответе сервера:', data.error);
                    alert(data.error || 'Что-то пошло не так. Попробуйте снова.');
                }
            } catch (error) {
                console.error('Ошибка запроса:', error);
                alert('Что-то пошло не так. Попробуйте снова.');
            }
        });
    } else {
        console.error('saveChangesButton, newNameInput, newEmailInput, profileSection или editProfileForm не определены');
    }
}

export default saveProfileChanges;
