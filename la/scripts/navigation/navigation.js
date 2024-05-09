import {
    navigateToHome,
    navigateToWatch,
    navigateToRecommendations,
    navigateToSchedule
} from './navigate.js';

class Navigation {
    constructor(buttonClass) {
        this.navButtons = document.querySelectorAll(buttonClass);
        this.bindEvents();
    }

    bindEvents() {
        this.navButtons.forEach(button => {
            button.addEventListener('click', event => {
                const buttonText = event.target.textContent;
                console.log(`Кнопка "${buttonText}" нажата`);

                switch (buttonText) {
                    case 'Главная':
                        navigateToHome();
                        break;
                    case 'Смотреть':
                        navigateToWatch();
                        break;
                    case 'Рекомендации':
                        navigateToRecommendations();
                        break;
                    case 'Расписание':
                        navigateToSchedule();
                        break;
                    default:
                        console.error('Неизвестная кнопка:', buttonText);
                }
            });
        });
    }
}

export default Navigation;
