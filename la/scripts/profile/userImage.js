// userImage.js

document.addEventListener("DOMContentLoaded", function() {
    const userImageContainer = document.getElementById('userImageContainer');
    const imageInput = document.getElementById('imageInput');

    // Обработчик события клика на рамке или содержимом контейнера картинки
    userImageContainer.addEventListener('click', function() {
        imageInput.click(); // Вызов события клика на скрытом input
    });

    // Обработчик события изменения файла в input
    imageInput.addEventListener('change', function(event) {
        const file = event.target.files[0]; // Получение выбранного файла
        const reader = new FileReader(); // Создание объекта FileReader

        // Обработчик события загрузки изображения
        reader.onload = function() {
            const imageUrl = reader.result; // Получение URL изображения
            userImageContainer.style.backgroundImage = `url(${imageUrl})`; // Установка изображения в качестве фона рамки
        };

        if (file) {
            reader.readAsDataURL(file); // Чтение данных изображения как URL
        }
    });
});
