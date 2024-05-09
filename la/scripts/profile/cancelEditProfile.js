function cancelEditProfile(cancelButton, profileSection, editProfileForm) {
    if (cancelButton && profileSection && editProfileForm) {
        cancelButton.addEventListener('click', function() {
            console.log('Кнопка cancelButton нажата');
            profileSection.style.display = 'block';
            editProfileForm.style.display = 'none';
        });
    } else {
        console.error('cancelButton, profileSection или editProfileForm не определены');
    }
}

export default cancelEditProfile;
