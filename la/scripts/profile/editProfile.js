function editProfile(editProfileButton, profileSection, editProfileForm, newNameInput, newEmailInput) {
    if (editProfileButton) {
        editProfileButton.addEventListener('click', function() {
            console.log('Кнопка editProfileButton нажата');
            profileSection.style.display = 'none';
            editProfileForm.style.display = 'block';
            newNameInput.value = document.getElementById('userName').innerText;
            newEmailInput.value = document.getElementById('userEmail').innerText;
        });
    }
}

export default editProfile;
