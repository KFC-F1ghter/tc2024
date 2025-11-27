var express = require('express');
var router = express.Router();
var User = require('../models/user').User;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', counter: req.session.counter });
});

/* GET login/registration page */
router.get('/logreg', function(req, res, next) {
    res.render('logreg', { title: 'Регистрация и вход' });
});

/* POST login/registration page */
router.post('/logreg', async function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    console.log('Username:', username);
    console.log('Password:', password);

    var users = await User.find({ username: username });
    console.log('Found users:', users);

    if (!users.length) {
        // Пользователь НЕ найден → создаём нового
        var user = new User({ username: username, password: password });
        await user.save();
        req.session.user_id = user._id;
        res.redirect('/');
    } else {
        // Пользователь найден → проверяем пароль
        var foundUser = users[0];
        if (foundUser.checkPassword(password)) {
            req.session.user_id = foundUser._id;
            res.redirect('/');
        } else {
            // Пароль неверный → возвращаем на страницу логина с сообщением
            res.render('logreg', { title: 'Вход', error: 'Неверный пароль' });
        }
    }
});

module.exports = router;
