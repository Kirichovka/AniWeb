function editProfile(editProfileButton, profileSection, editProfileForm, newNameInput, newEmailInput) {
    if (editProfileButton && profileSection && editProfileForm && newNameInput && newEmailInput) {
        editProfileButton.addEventListener('click', function() {
            console.log('Кнопка editProfileButton нажата');
            profileSection.style.display = 'none';
            editProfileForm.style.display = 'block';
            newNameInput.value = document.getElementById('userName').innerText;
            newEmailInput.value = document.getElementById('userEmail').innerText;
        });
    } else {
        console.error('editProfileButton, profileSection, editProfileForm, newNameInput или newEmailInput не определены');
    }
}

export default editProfile;
