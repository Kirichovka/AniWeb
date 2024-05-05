function errorHandler(err, req, res, next) {
    console.error('Ошибка: ', err.message);
    res.status(500).json({ error: 'Что-то пошло не так! Пожалуйста, повторите попытку позже.' });
}

module.exports = errorHandler;
