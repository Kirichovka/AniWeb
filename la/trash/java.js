document.addEventListener("DOMContentLoaded", function() {
var userRegistered = false;

// Функция для проверки статуса регистрации пользователя
async function checkLoggedIn() {
    try {
        console.log('Проверка, зарегистрирован ли пользователь');
        var response = await fetch('http://localhost:3001/users/check', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401) {
            console.log('Ошибка аутентификации. Пользователь не авторизован.');
            userRegistered = false; // Пользователь не зарегистрирован
            // Дополнительные действия при ошибке 401, например, скрыть профиль и отобразить форму регистрации
            if (profileSection && registrationForm) {
                profileSection.style.display = 'none';
                registrationForm.style.display = 'block';
            }
            return false; // Пользователь не зарегистрирован
        } else if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        } else {
            var data = await response.json();
            if (data.loggedIn) {
                console.log('Пользователь уже зарегистрирован');
                userRegistered = true; // Пользователь зарегистрирован
                if (profileSection && registrationForm) {
                    profileSection.style.display = 'block';
                    registrationForm.style.display = 'none';
                }
                document.getElementById('userName').innerText = data.name;
                document.getElementById('userEmail').innerText = data.email;
                return true; // Пользователь зарегистрирован
            } else {
                console.log('Пользователь не зарегистрирован');
                userRegistered = false; // Пользователь не зарегистрирован
                if (profileSection && registrationForm) {
                    profileSection.style.display = 'none';
                    registrationForm.style.display = 'block';
                }
                return false; // Пользователь не зарегистрирован
            }
        }
    } catch (error) {
        console.error('Ошибка проверки пользователя:', error);
        userRegistered = false; // Пользователь не зарегистрирован из-за ошибки
        if (profileSection && registrationForm) {
            profileSection.style.display = 'none';
            registrationForm.style.display = 'block';
        }
        return false; // Пользователь не зарегистрирован из-за ошибки
    }
}


// Вызов функции для проверки статуса регистрации пользователя
if(!checkLoggedIn()){

}

    // Открыть модальное окно при клике на userInfo, если пользователь не зарегистрирован
    if (userInfo && modal) {
        userInfo.addEventListener('click', function() {
            console.log('userInfo нажата');
            if (!modalOpened && registrationForm && registrationForm.style.display === 'block') {
                console.log('Открытие модального окна');
                modal.style.display = 'flex';
                modal.classList.add('open');
                modalOpened = true;
            }
        });
    }

    // Закрыть модальное окно
    if (closeButton && modal) {
        closeButton.addEventListener('click', function() {
            console.log('Кнопка closeButton нажата');
            console.log('Закрытие модального окна');
            modal.classList.remove('open');
            setTimeout(function() {
                modal.style.display = 'none';
                modalOpened = false;
            }, 400);
        });
    }

    // Отправка формы регистрации
    if (registrationForm) {
        registrationForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;

            try {
                var response = await fetch('http://localhost:3001/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                });

                var data = await response.json();

                if (response.ok) {
                    console.log('Регистрация прошла успешно');
                    registrationForm.style.display = 'none';
                    profileSection.style.display = 'block';
                    document.getElementById('userName').innerText = name;
                    document.getElementById('userEmail').innerText = email;
                    document.getElementById('name').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('password').value = '';
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

    // Показать форму редактирования профиля
    if (editProfileButton) {
        editProfileButton.addEventListener('click', function() {
            console.log('Кнопка editProfileButton нажата');
            profileSection.style.display = 'none';
            editProfileForm.style.display = 'block';
            newNameInput.value = document.getElementById('userName').innerText;
            newEmailInput.value = document.getElementById('userEmail').innerText;
        });
    }

    // Отменить редактирование профиля
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            console.log('Кнопка cancelButton нажата');
            profileSection.style.display = 'block';
            editProfileForm.style.display = 'none';
        });
    }

    // Сохранить изменения профиля
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

    // Кнопка выхода
    if (logoutButton) {
        logoutButton.addEventListener('click', async function() {
            console.log('Кнопка logoutButton нажата');
            try {
                var response = await fetch('http://localhost:3001/users/logout', {
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

    window.onclick = function(event) {
        if (event.target === modal && modalOpened) {
            console.log('Щелчок за пределами модального окна');
            console.log('Закрытие модального окна');
            modal.classList.remove('open');
            setTimeout(function() {
                modal.style.display = 'none';
                modalOpened = false;
            }, 400);
        }
    };

    // Отправка пользовательской формы
    var userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', function(event) {
            event.preventPreventDefault();
            console.log('Отправка формы');

            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;

            console.log('Полученные данные:');
            console.log('Имя:', name);
            console.log('Email:', email);

            var userData = {
                name: name,
                email: email,
                password: password
            };

            fetch('http://localhost:3001/users/check', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Ответ от сервера:', data);
            })
            .catch(error => {
                console.error('Ошибка отправки данных на сервер:', error);
                alert('Произошла ошибка при отправке данных на сервер. Пожалуйста, повторите попытку позже.');
            });
        });
    }
});
