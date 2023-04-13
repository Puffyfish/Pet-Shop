const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/petShop');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

// require model database
const Pet = require('./models/pets');



//  TO INSERT MULTIPLE PRODUCTS
const seedPets = [
  {
    name: 'Fairy Eggplant',
    image: '/',
    breed: 'Silky Terrier',
    price: 101.00,
    category: 'Cat'
  },
  {
    name: 'Goddess',
    image: '',
    breed: 'Pug',
    age: 2,
    price: 124.99,
    category: 'Dog'
  },
  {
    name: 'Mini Watermelon',
    image: '',
    breed: 'Maltese',
    age: 0,
    price: 133.99,
    category: 'Fish'
  },
  {
    name: 'Celery',
    image: '/imgs/parrot.jpg',
    breed: 'Parrot',
    price: 53,
    age: 1,
    category: 'Bird'
  },
  {
    name: 'Chocolate Milk',
    image: '/imgs/cat.jpg',
    breed: 'Ragdoll',
    age: 0,
    price: 132.69,
    category: 'Cat'
  },
  {
    name: 'Ruby',
    image: '/imgs/cat.jpg',
    breed: 'Cavapoos',
    age: 4,
    price: 167,
    category: 'Cat'
  },
  {
    name: 'Macon',
    image: '',
    breed: 'Border Collie',
    age: 2,
    price: 152,
    category: 'Dog'
  },
  {
    name: 'Evangeline',
    image: '/imgs/cat.jpg',
    breed: 'Balinese',
    age: 4,
    price: 84,
    category: 'Cat'
  },
  {
    name: 'Chastity',
    image: '',
    breed: 'Alaskan Malamute',
    age: 1,
    price: 63,
    category: 'Dog'
  },
  {
    name: 'Felix',
    image: '/imgs/cat.jpg',
    breed: 'Maine Coon',
    age: '0',
    price: 119,
    category: 'Cat'
  },
  {
    name: 'Ivy',
    image: '',
    breed: 'French Bulldog',
    age: 4,
    price: 168,
    category: 'Dog'
  },
  {
    name: 'Ruby',
    image: '/imgs/parrot.jpg',
    breed: 'Parrot',
    age: 5,
    price: 120,
    category: 'Bird'
  },
  {
    name: 'Xaviera',
    image: '/imgs/cat.jpg',
    breed: 'Balinese',
    age: 6,
    price: 116,
    category: 'Cat'
  },
  {
    name: 'Karina',
    image: '',
    breed: 'German Shepherd',
    age: 3,
    price: 53,
    category: 'Dog'
  },
  {
    name: 'Craig',
    image: '',
    breed: 'Bengal',
    age: 6,
    price: 82,
    category: 'Cat'
  },
  {
    name: 'Helen',
    image: '',
    breed: 'Bulldog',
    age: 6,
    price: 115,
    category: 'Dog'
  },
  {
    name: 'Jerry',
    image: '',
    breed: 'Goldfish',
    age: 6,
    price: 36,
    category: 'Fish'
  },
  {
    name: 'Aphrodite',
    image: '',
    breed: 'Chihuahua',
    age: 0,
    price: 118,
    category: 'Dog'
  },
  {
    name: 'Hiroko',
    image: '',
    breed: 'Labrador',
    age: 7,
    price: 71,
    category: 'Dog'
  },
  {
    name: 'Driscoll',
    image: '/imgs/parrot.jpg',
    breed: 'Scarlet Macaw',
    age: 1,
    price: 193,
    category: 'Bird'
  },
  {
    name: 'Zelda',
    image: '/imgs/cat.jpg',
    breed: 'American Shorthair',
    age: 1,
    price: 113,
    category: 'Cat'
  },
  {
    name: 'Amaya',
    image: '',
    breed: 'Angelfish',
    age: 0,
    price: 29,
    category: 'Fish'
  },
  {
    name: 'Cullen',
    image: '',
    breed: 'Goldfish',
    age: 0,
    price: 15,
    category: 'Fish'
  },
  {
    name: 'Caesar',
    image: '',
    breed: 'Red-eared Slider',
    age: 4,
    price: 169,
    category: 'Fish'
  },
  {
    name: 'Wallace',
    image: '',
    breed: 'Poodle',
    age: 1,
    price: 112,
    category: 'Dog'
  }
]

// if any of the seedProducts doesnt passed
// mongoose's validation, then nothing will be inserted
Pet.insertMany(seedPets)
  .then(res => {
    console.log(res)
    console.log('it worked')
  })
  .catch(e => {
    console.log(e)
  })
