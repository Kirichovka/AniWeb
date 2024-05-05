function cancelEditProfile(cancelButton, profileSection, editProfileForm) {
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            console.log('Кнопка cancelButton нажата');
            profileSection.style.display = 'block';
            editProfileForm.style.display = 'none';
        });
    }
}

export default cancelEditProfile;
