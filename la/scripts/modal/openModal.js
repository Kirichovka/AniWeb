function openModal(userInfo, modal, setModalOpened, registrationForm) {
    if (userInfo && modal) {
        userInfo.addEventListener('click', function() {
            console.log('userInfo нажата');
            console.log('Открытие модального окна');
            modal.style.display = 'flex';
            modal.classList.add('open');
            setModalOpened(true);

            if (registrationForm) {
                registrationForm.style.display = 'block';
            }
        });
    } else {
        console.error('userInfo или modal не определены');
    }
}

export default openModal;
