function openModal(userInfo, modal, setModalOpened, registrationForm) {
    if (userInfo && modal) {
        userInfo.addEventListener('click', function() {
            console.log('userInfo нажата');
            if (registrationForm && registrationForm.style.display === 'block') {
                console.log('Открытие модального окна');
                modal.style.display = 'flex';
                modal.classList.add('open');
                setModalOpened(true);
            } else {
                console.error('registrationForm не отображается');
            }
        });
    } else {
        console.error('userInfo или modal не определены');
    }
}

export default openModal;
