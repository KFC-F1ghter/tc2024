var express = require('express');
var router = express.Router();
var User = require('../models/user').User;

/* Middleware для передачи пользователя в шаблон */
async function attachUser(req, res, next) {
    res.locals.user = null;
    if (req.session.user_id) {
        try {
            const user = await User.findById(req.session.user_id);
            if (user) {
                res.locals.user = user;
            }
        } catch (err) {
            console.error(err);
        }
    }
    next();
}

/* GET home page */
router.get('/', attachUser, function(req, res, next) {
    res.render('index', { 
        title: 'Три кота', 
        counter: req.session.counter || 0 
    });
});

/* GET login/registration page */
router.get('/logreg', function(req, res, next) {
    res.render('logreg', { title: 'Регистрация и вход', error: null });
});

/* POST login/registration page */
router.post('/logreg', async function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.render('logreg', { title: 'Вход', error: 'Введите имя и пароль' });
    }

    try {
        const users = await User.find({ username: username });

        if (!users.length) {
            // Пользователь НЕ найден → создаём нового
            const user = new User({ username: username, password: password });
            await user.save();
            req.session.user_id = user._id;
            return res.redirect('/');
        } else {
            // Пользователь найден → проверяем пароль
            const foundUser = users[0];
            if (foundUser.checkPassword(password)) {
                req.session.user_id = foundUser._id;
                return res.redirect('/');
            } else {
                // Пароль неверный
                return res.render('logreg', { title: 'Вход', error: 'Неверный пароль' });
            }
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/* POST logout. */
router.post('/logout', function(req, res, next) {
 req.session.destroy();
 res.locals.user = null;
 res.redirect('/');
});


module.exports = router;
