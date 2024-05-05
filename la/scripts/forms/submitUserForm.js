function submitUserForm() {
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
}

export default submitUserForm;
