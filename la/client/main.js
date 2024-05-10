import { AuthModal, checkLoggedIn, logoutUser } from './auth/index.js';
import { Navigation } from './navigation/index.js';
import { submitRegistrationForm, submitUserForm } from './forms/index.js';
import { openModal, closeModal } from './modal/index.js';
import { editProfile, saveProfileChanges, cancelEditProfile, getUserProfile } from './profile/index.js';

document.addEventListener("DOMContentLoaded", async function () {
    const modal = document.getElementById('modal');
    const closeButton = document.getElementById('closeButton');
    let modalOpened = false;

    // Инициализация модального окна аутентификации
    const authModal = new AuthModal('modal', 'closeButton');
    const navigation = new Navigation('.nav-button');

    const userInfo = document.getElementById('userInfo');
    const userInfoProfile = document.getElementById('userInfoProfile');
    const registrationFormContainer = document.getElementById('registrationFormContainer');
    const loginFormContainer = document.getElementById('loginFormContainer');
    const editProfileButton = document.getElementById('editProfileButton');
    const saveChangesButton = document.getElementById('saveChangesButton');
    const cancelButton = document.getElementById('cancelButton');
    const editProfileForm = document.getElementById('editProfileForm');
    const newNameInput = document.getElementById('newNameInput');
    const newEmailInput = document.getElementById('newEmailInput');

    if (!modal || !closeButton || !editProfileButton || !saveChangesButton || !cancelButton || !editProfileForm || !newNameInput || !newEmailInput) {
        console.error('Не удалось найти все необходимые элементы в DOM');
        return;
    }

    // Открытие модального окна
    userInfo.addEventListener('click', () => authModal.openModal());

    // Закрытие модального окна
    closeButton.addEventListener('click', () => authModal.closeModal());

    window.addEventListener('click', function (event) {
        if (event.target === modal && modalOpened) {
            authModal.closeModal();
        }
    });

    // Проверка, авторизован ли пользователь
    const isLoggedIn = await checkLoggedIn(userInfoProfile, registrationFormContainer);
    if (isLoggedIn) {
        userInfoProfile.addEventListener('click', async () => {
            try {
                const response = await fetch('http://localhost:3001/users/check', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();

                if (!response.ok || !data.loggedIn) {
                    throw new Error('Пользователь не авторизован');
                }

                const userId = data.id;

                const userProfile = await getUserProfile(userId);
                console.log('Информация о профиле пользователя:', userProfile);
            } catch (error) {
                console.error('Ошибка при получении профиля пользователя:', error.message);
            }
        });
    }

    // Обработчики форм
    submitUserForm();
    submitRegistrationForm(userInfoProfile);
    logoutUser(document.getElementById('logoutButton'), userInfoProfile, registrationFormContainer);
    editProfile(editProfileButton, userInfoProfile, editProfileForm, newNameInput, newEmailInput);
    saveProfileChanges(saveChangesButton, newNameInput, newEmailInput, userInfoProfile, editProfileForm);
    cancelEditProfile(cancelButton, userInfoProfile, editProfileForm);
});
