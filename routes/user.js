const express = require('express');
const router = express.Router();
const passport = require('passport');
const AppError = require('../utils/AppError');
const wrapAsync = require('../utils/wrapAsync') // with this wrapper, we dont need to do try-catch in error handling
const { errorSchema } = require('../utils/petSchema');
const User = require('../models/user');

const validateForm = (req, res, next) => {
  const { error } = errorSchema.validate(req.body);
  if (error) {
    console.log(error)
    const msg = error.details.map(el => el.message).join(',')
    throw new AppError(msg, 400)
  } else {
    next();
  }
}


// DEFINE ROUTES

router.get('/login', (req, res) => {
  res.render('auth/login');
}
)

router.get('/register', (req, res) => {
  res.render('auth/register')
})

router.post('/register', wrapAsync(async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password); // .register is a method from PASSPORT
    // to automatically login the newly registered user
    console.log(registeredUser)
    req.login(registeredUser, err => {
      if (err) return next(err);
      req.flash("success", `Welcome ${username}!`);
      res.redirect('/pets');
    })
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
}
))

router.post('/login', passport.authenticate('local',
  { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    console.log('Successfully logged in')
    req.flash('success', 'Welcome back!');
    res.redirect('/pets')
  })

router.get('/logout', (req, res, next) => {
  // PASSPORT has a method for logging out
  // it needs a callback function, error as the parameter
  req.logout(function (err) {
    if (err) return next(err);
    req.flash('success', 'Successfully logged out.')
    res.redirect('/pets')
  })
})

module.exports = router;