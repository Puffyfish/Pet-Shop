const express = require('express');
const router = express.Router();

const AppError = require('../utils/AppError');
const wrapAsync = require('../utils/wrapAsync') // with this wrapper, we dont need to do try-catch in error handling
const { errorSchema} = require('../utils/petSchema');

const Pet = require('../models/pets')
const categories = ['dog', 'cat', 'fish', 'bird']

const validateForm = (req, res, next) => {
    const { error } = errorSchema.validate(req.body);
    if(error) {
      console.log(error)
      const msg = error.details.map(el => el.message).join(',')
      throw new AppError(msg, 400)
    } else {
      next();
    }
  }

  
// DEFINE ROUTES

// Home route
router.get('/', wrapAsync(async (req, res, next) => {
    const pets = await Pet.find({});
    res.render('pages/index', { pets });
  }
))

// New route (a)
router.get('/new', (req, res) => {
  res.render('pages/new')
})

router.get('/dogs', wrapAsync(async (req, res, next) => {
    const animals = await Pet.find({ category: 'Dog' });
    res.render('pages/gallery', {animals});
  } 
))

router.get('/cats', wrapAsync(async (req, res, next) => {
    const animals = await Pet.find({ category: 'Cat' });
    res.render('pages/gallery', {animals});
  }
))

router.get('/fishes', wrapAsync(async (req, res, next) => {
    const animals = await Pet.find({ category: 'Fish' });
    res.render('pages/gallery', {animals});
  }
))

router.get('/birds', wrapAsync(async (req, res, next) => {
    const animals = await Pet.find({ category: 'Bird' });
    res.render('pages/gallery', {animals});
  }
))

router.get('/faq', (req, res) => {
  res.render('pages/faq')
})

// show route for specific id
router.get('/:id', wrapAsync (async (req, res, next) => {
    const { id } = req.params;
    const pet = await Pet.findById(id);
    if (!pet) {
    //   throw new AppError('Pet not found!', 404);
        req.flash('error', 'Cannot find this pet!');
        // console.log(error);x
        return res.redirect('/');
    }
    res.render('pages/details', { pet } )
  }
))

// New route (b)
router.post('/', validateForm, wrapAsync (async (req, res, next) => {
    const newPet = new Pet(req.body)
    await newPet.save();
    console.log(newPet);
    req.flash('sucess', 'Successfully added a new pet!')
    res.redirect(`/${newPet._id}`);
  }
))

// Edit route
router.get('/:id/edit', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const pet = await Pet.findById(id);
    if (!pet) {
      throw new AppError('Pet not found', 404);
    }res.render('pages/edit', { pet, categories } )
  }
))

router.put('/:id', validateForm, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    editedPet = await Pet.findByIdAndUpdate(id, {...req.body}, {runValidators: true, new: true})
    req.flash('success', 'Successfully updated!');
    res.redirect(`/${editedPet._id}`);
  }
))


// Delete route
router.delete('/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedPet = await Pet.findByIdAndDelete(id);
    log(`${deletedPet.name} has been deleted`);
    req.flash('success', 'Data deleted!');
    res.redirect('/');
  }
))

module.exports = router;