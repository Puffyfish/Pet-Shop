const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

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

// Show route
app.get('/', async (req, res) => {
  const pets = await Pet.find({})
  console.log(pets)
  res.render('pages/index', { pets })
})

// New route (a)
app.get('/new', (req, res) => {
  res.render('pages/new')
})

// show route for specific id
app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const pets = await Pet.findById(id)
  res.render('pages/details', { pets } )
})

// New route (b)
app.post('/', async (req, res) => {
  const newPet = new Pet(req.body)
  await newPet.save();
  console.log(newPet)
  res.redirect(`/${newPet._id}`);
})

// Edit route
app.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const pets = await Pet.findById(id)
  res.render('pages/edit', { pets, categories } )
})

app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const editedPet = await Pet.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
  res.redirect(`/${editedPet._id}`);
})

// Delete route
app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedPet = await Pet.findByIdAndDelete(id);
  console.log(`${deletedPet.name} has been deleted`);
  res.redirect('/');
})



app.listen(3050, (req, res) => {
  console.log('Listening on port 3050!');
})
