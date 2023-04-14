const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const AppError = require('./utils/AppError');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1/petShop')
  .then(() => {
    console.log("Mongo connection open!!!");
  })
  .catch(() => {
    console.log("Oh no Mongo Connection error!!");
    console.log(err);
  })

const Pet = require('./models/pets')
const categories = ['dog', 'cat', 'fish', 'bird']

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

// DEFINE ROUTES

// Home route
app.get('/', async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.render('pages/index', { pets });
  } catch(e) {
    next(e);
  }
  
})

// New route (a)
app.get('/new', (req, res) => {
  res.render('pages/new')
})

app.get('/dogs', async (req, res) => {
  try {
    const animals = await Pet.find({ category: 'Dog' });
    console.log(animals);
    res.render('pages/gallery', {animals});
  } catch(e) {
    next(e);
  }
  
})

app.get('/cats', async (req, res) => {
  try {
    const animals = await Pet.find({ category: 'Cat' });
    console.log(animals);
    res.render('pages/gallery', {animals});
  } catch(e) {
    next(e);
  }
  
})

app.get('/fishes', async (req, res) => {
  try {
    const animals = await Pet.find({ category: 'Fish' });
    res.render('pages/gallery', {animals});
  } catch(e) {
    next(e);
  }
  
})

app.get('/birds', async (req, res) => {
  try {const animals = await Pet.find({ category: 'Bird' });
    res.render('pages/gallery', {animals});
  } catch(e) {
    next(e);
  }
})

// show route for specific id
app.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id);
    if (!pet) {
      return next(new AppError('Pet not found!', 404));
    }
    res.render('pages/details', { pet } )
  } catch (e) {
    next(e);
  }
  
})

// New route (b)
app.post('/', async (req, res) => {
  try {
    const newPet = new Pet(req.body)
    await newPet.save();
    console.log(newPet)
    res.redirect(`/${newPet._id}`);
  } catch(e) {
    next(e);
  }
})

// Edit route
app.get('/:id/edit', async (req, res) => {
  try {
    const { id } = req.params;
    const pets = await Pet.findById(id)
    res.render('pages/edit', { pets, categories } )
  } catch(e) {
    next(e);
  }
})

app.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const editedPet = await Pet.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    res.redirect(`/${editedPet._id}`);
  } catch(e) {
    next(e);
  }
})


// Delete route
app.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPet = await Pet.findByIdAndDelete(id);
    console.log(`${deletedPet.name} has been deleted`);
    res.redirect('/');
  } catch(e) {
    next(e);
  }
})


app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong!' } = err;
  // err here is from the AppError.js class we created
  // 500, and the declared message is a default if there is no specified error status and message
  res.status(status).send(message);
})


app.listen(3050, (req, res) => {
  console.log('Listening on port 3050!');
})
