function isLoggedIn(req, res, next) {
    if (req.session.user && req.session.user.loggedIn) {
        next();
    } else {
        res.status(401).json({ error: 'Необходимо войти в систему.' });
    }
}

function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ error: 'Недостаточно прав доступа.' });
    }
}

module.exports = {
    isLoggedIn,
    isAdmin
};
