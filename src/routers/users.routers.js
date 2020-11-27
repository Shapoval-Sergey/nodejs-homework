const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../schemas/users');

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('message', 'Авторизируйтесь');
  res.redirect('/');
};

router.get('/', (req, res, next) => {
  res.render('index', { message: req.flash('message') });
});

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('message', 'Укажите правильный логин и пароль!');
      return res.redirect('/');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/profile');
    });
  })(req, res, next);
});

router.get('/registration', (req, res, next) => {
  res.render('registration', { message: req.flash('message') });
});

router.post('/registration', async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    //создаем экземпляр пользователя и указываем введенные данные
    const user = await User.findOne({ email });
    //если такой пользователь уже есть - сообщаем об этом
    if (user) {
      req.flash('message', 'Пользователь с таким Email уже существует');
      return res.redirect('/');
    }
    const newUser = new User({ username, email });
    newUser.setPassword(password);
    //если нет - добавляем пользователя в базу
    await newUser.save();
    req.flash('message', 'Вы успешно зарегистрировались');
    res.redirect('/');
  } catch (e) {
    next(e);
  }
});

router.get('/profile', isLoggedIn, (req, res, next) => {
  console.log(req.session.passport);
  const { username, email } = req.user;
  res.render('profile', { username, email });
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
