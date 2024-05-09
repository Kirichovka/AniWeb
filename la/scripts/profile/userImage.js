document.addEventListener("DOMContentLoaded", function() {
    const userImageContainer = document.getElementById('userImageContainer');
    const imageInput = document.getElementById('imageInput');

    if (userImageContainer && imageInput) {
        userImageContainer.addEventListener('click', function() {
            imageInput.click();
        });

        imageInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = function() {
                const imageUrl = reader.result;
                userImageContainer.style.backgroundImage = `url(${imageUrl})`;
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        });
    } else {
        console.error('userImageContainer или imageInput не определены');
    }
});
