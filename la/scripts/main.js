// Импортируем необходимые функции и модули
import checkLoggedIn from './auth/checkLoggedIn.js';
import registerUser from './auth/registerUser.js';
import loginUser from './auth/loginUser.js';
import logoutUser from './auth/logoutUser.js';
import { getUserProfile } from './profile/profile.js'; // Импортируем функцию для получения профиля пользователя

import editProfile from './profile/editProfile.js';
import saveProfileChanges from './profile/saveProfileChanges.js';
import cancelEditProfile from './profile/cancelEditProfile.js';

import openModal from './modal/openModal.js';
import closeModal from './modal/closeModal.js';

import submitUserForm from './forms/submitUserForm.js';
import submitRegistrationForm from './forms/submitRegistrationForm.js';

import {
    navigateToHome,
    navigateToWatch,
    navigateToRecommendations,
    navigateToSchedule
} from './navigation/navigation.js';

import './profile/userImage.js'; // Подключаем модуль для работы с изображением пользователя

document.addEventListener("DOMContentLoaded", function() {
    // Инициализация элементов
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const userInfo = document.getElementById('userInfo');
    const registrationForm = document.getElementById('registrationForm');
    const userInfoProfile = document.getElementById('userInfoProfile');
    const editProfileForm = document.getElementById('editProfileForm');
    const editProfileButton = document.getElementById('editProfileButton');
    const cancelButton = document.getElementById('cancelButton');
    const saveChangesButton = document.getElementById('saveChangesButton');
    const logoutButton = document.getElementById('logoutButton');

    let modalOpened = false;

    // Открытие модального окна для регистрации
    if (userInfo) {
        userInfo.addEventListener('click', function() {
            console.log('userInfo нажата');
            modal.style.display = 'flex';
            modal.classList.add('open');
            registrationForm.style.display = 'block';
            userInfoProfile.style.display = 'none';
            modalOpened = true;
        });
    }

    // Закрытие модального окна
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            modal.classList.remove('open');
            setTimeout(function() {
                modal.style.display = 'none';
                modalOpened = false;
            }, 400);
        });
    }

    // Закрытие модального окна при клике за его пределами
    window.onclick = function(event) {
        if (event.target === modal && modalOpened) {
            modal.classList.remove('open');
            setTimeout(function() {
                modal.style.display = 'none';
                modalOpened = false;
            }, 400);
        }
    };

    // Обработчики для кнопок навигации
    const navButtons = document.querySelectorAll('.nav-button');

    navButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const buttonText = event.target.textContent;
            console.log(`Кнопка "${buttonText}" нажата`);

            switch (buttonText) {
                case 'Главная':
                    console.log('Навигация на "Главная"');
                    navigateToHome();
                    break;
                case 'Смотреть':
                    console.log('Навигация на "Смотреть"');
                    navigateToWatch();
                    break;
                case 'Рекомендации':
                    console.log('Навигация на "Рекомендации"');
                    navigateToRecommendations();
                    break;
                case 'Расписание':
                    console.log('Навигация на "Расписание"');
                    navigateToSchedule();
                    break;
                default:
                    console.error('Неизвестная кнопка:', buttonText);
            }
        });
    });

    // Остальные функции, которые были ранее
    checkLoggedIn(userInfoProfile, registrationForm);
    registerUser(registrationForm, userInfoProfile);
    submitUserForm();
    submitRegistrationForm(userInfoProfile); // Передаем userInfoProfile в функцию submitRegistrationForm
    logoutUser(logoutButton, userInfoProfile, registrationForm);
    editProfile(editProfileButton, userInfoProfile, editProfileForm);
    saveProfileChanges(saveChangesButton, userInfoProfile, editProfileForm);
    cancelEditProfile(cancelButton, userInfoProfile, editProfileForm);

    // Добавляем обработчики для отображения профиля пользователя при клике на имя пользователя или изображение
     if (userInfoProfile) {
        userInfoProfile.addEventListener('click', async () => {
            try {
                // Получаем информацию о профиле пользователя
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

                let userId = data.id; // Предположим, что идентификатор пользователя находится в data.id

                // Получаем информацию о профиле пользователя
                const userProfile = await getUserProfile(userId);
                console.log('Информация о профиле пользователя:', userProfile);
                // Здесь можно отобразить информацию о профиле пользователя в модальном окне или другом месте на странице
            } catch (error) {
                console.error('Ошибка при получении профиля пользователя:', error.message);
            }
        });
    }

    const isLoggedIn = await checkLoggedIn();
    if (isLoggedIn) {
        userInfoProfile.addEventListener('click', async () => {
            try {
                // Получаем информацию о профиле пользователя
                const userProfile = await getUserProfile(userId);
                console.log('Информация о профиле пользователя:', userProfile);
            } catch (error) {
                console.error('Ошибка при получении профиля пользователя:', error.message);
            }
        });
    }
});
