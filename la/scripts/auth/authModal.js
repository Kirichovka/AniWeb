import registerUser from './registerUser.js';
import loginUser from './loginUser.js';

class AuthModal {
    constructor(modalId, closeButtonId) {
        this.modal = document.getElementById(modalId);
        this.closeButton = document.getElementById(closeButtonId);
        this.errorMessage = document.getElementById('errorMessage');

        this.registrationFormContainer = document.getElementById('registrationFormContainer');
        this.loginFormContainer = document.getElementById('loginFormContainer');
        this.userInfoProfile = document.getElementById('userInfoProfile');

        this.registrationForm = document.getElementById('registerForm');
        this.loginForm = document.getElementById('loginForm');

        this.modalOpened = false;

        this.bindEvents();
    }

    bindEvents() {
        if (this.closeButton) {
            this.closeButton.addEventListener('click', this.closeModal.bind(this));
        } else {
            console.error('closeButton не найден');
        }

        window.addEventListener('click', this.handleOutsideClick.bind(this));

        if (this.registrationForm) {
            this.registrationForm.addEventListener('submit', this.submitRegistrationForm.bind(this));
        } else {
            console.error('registrationForm не найден');
        }

        if (this.loginForm) {
            this.loginForm.addEventListener('submit', this.submitLoginForm.bind(this));
        } else {
            console.error('loginForm не найден');
        }
    }

    openModal() {
        if (this.modal) {
            this.modal.style.display = 'flex';
            this.modal.classList.add('open');
            if (this.registrationFormContainer) this.registrationFormContainer.style.display = 'block';
            if (this.loginFormContainer) this.loginFormContainer.style.display = 'block';
            if (this.userInfoProfile) this.userInfoProfile.style.display = 'none';
            this.modalOpened = true;
        } else {
            console.error('modal не найден');
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('open');
            setTimeout(() => {
                this.modal.style.display = 'none';
                this.modalOpened = false;
            }, 400);
        } else {
            console.error('modal не найден');
        }
    }

    handleOutsideClick(event) {
        if (event.target === this.modal && this.modalOpened) {
            this.closeModal();
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showError(message) {
        if (this.errorMessage) {
            this.errorMessage.textContent = message;
            this.errorMessage.style.display = 'block';
        }
    }

    clearError() {
        if (this.errorMessage) {
            this.errorMessage.style.display = 'none';
        }
    }

    submitRegistrationForm(event) {
        event.preventDefault();
        this.clearError();

        const username = this.registrationForm.querySelector('[name="username"]').value;
        const email = this.registrationForm.querySelector('[name="email"]').value;
        const password = this.registrationForm.querySelector('[name="password"]').value;

        if (!username) {
            this.showError('Имя пользователя не может быть пустым.');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showError('Некорректный формат email.');
            return;
        }

        if (password.length < 8) {
            this.showError('Пароль должен содержать не менее 8 символов.');
            return;
        }

        registerUser({ username, email, password })
            .then(() => {
                alert('Регистрация прошла успешно!');
                this.registrationForm.reset();
            })
            .catch(err => this.showError(`Ошибка регистрации: ${err.message}`));
    }

    submitLoginForm(event) {
        event.preventDefault();
        this.clearError();

        const email = this.loginForm.querySelector('[name="email"]').value;
        const password = this.loginForm.querySelector('[name="password"]').value;

        if (!this.isValidEmail(email)) {
            this.showError('Некорректный формат email.');
            return;
        }

        loginUser({ email, password })
            .then(() => {
                alert('Вход прошел успешно!');
                this.loginForm.reset();
            })
            .catch(err => this.showError(`Ошибка входа: ${err.message}`));
    }
}

export default AuthModal;
