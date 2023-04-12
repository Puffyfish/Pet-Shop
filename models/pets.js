const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  breed: String,
  price: Number,
  age: {
    type: Number,
    min: 0,
    max: 10
  },
  category: {
    type: String,
    lowercase: true,
    enum: ['dog', 'cat', 'fish', 'bird']
  }
})

const Pet = mongoose.model('Pet', petSchema)

// export model
module.exports = Pet;
