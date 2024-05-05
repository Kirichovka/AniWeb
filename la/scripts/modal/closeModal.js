function closeModal(closeButton, modal, setModalOpened) {
    if (closeButton && modal) {
        closeButton.addEventListener('click', function() {
            console.log('Закрытие модального окна');
            modal.classList.remove('open');
            setTimeout(function() {
                modal.style.display = 'none';
                setModalOpened(false);
            }, 400);
        });
    } else {
        console.error('closeButton или modal не определены');
    }
}

export default closeModal;
