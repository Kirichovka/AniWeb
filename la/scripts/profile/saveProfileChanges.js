function saveProfileChanges(saveChangesButton, newNameInput, newEmailInput, profileSection, editProfileForm) {
    if (saveChangesButton) {
        saveChangesButton.addEventListener('click', async function() {
            console.log('Кнопка saveChangesButton нажата');
            var newName = newNameInput.value;
            var newEmail = newEmailInput.value;

            try {
                var response = await fetch('http://localhost:3001/users/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ newName, newEmail })
                });

                var data = await response.json();

                if (response.ok) {
                    console.log('Изменения сохранены успешно');
                    document.getElementById('userName').innerText = newName;
                    document.getElementById('userEmail').innerText = newEmail;
                    profileSection.style.display = 'block';
                    editProfileForm.style.display = 'none';
                    alert('Изменения сохранены успешно.');
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

export default saveProfileChanges;
