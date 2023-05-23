const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');

const AppError = require('./utils/AppError');

const petRoutes = require('./routes/pets')
const userRoutes = require('./routes/user')

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user')


mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1/petShop')
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Database connected!!!"));

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

app.use(morgan('tiny')); // for logging in the terminal, useful for debugging

const sessionConfig = {
  secret: 'thisisverysecretive',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, // VERY IMPORTANT, so cookie cannot be accessed in client-side
    expires: Date.now() + 1000 * 60 * 60 *24 * 7,
    maxAge: 1000 * 60 * 60 *24 * 7
  }
}
app.use(session(sessionConfig));
app.use(flash());

// PASSPORT AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());// to store a user in session
passport.deserializeUser(User.deserializeUser());

// middleware for FLASH error and success message
app.use( (req, res, next) => {
  res.locals.currentUser = req.user; // this is provided by passport
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

// ------------------ Routes ------------------- 

app.use('', userRoutes);
app.use('/pets', petRoutes);

app.all('*', (err,req,res,next) => {
  next(new AppError('Page not found!', 404));
})

app.use((err, req, res, next) => {
  const { status = 500} = err;
  // err here is from the AppError.js class we created
  if (!err.message) { // if there's no error message
    err.message = 'Something went wrong!'; // then, set this default message
  }
  res.status(status).render('not-found', {err})
})


app.listen(3050, (req, res) => {
  console.log('Listening on port 3050!');
})
