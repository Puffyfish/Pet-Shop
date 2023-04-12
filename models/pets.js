const mongoose = require('mongoose');
const {Schema} = mongoose;

const petSchema = new Schema(
  {
    name: {type: String, required: true},
    breed: {type: String, required: true},
    price: {type: Number, required: true},
    age: {type: Number, min: 0, max: 10},
    category: {
      type: String,
      lowercase: true,
      enum: ['dog', 'cat', 'fish', 'bird']
    }
  }, { // virtuals are not saved in the database
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true // sets timestamps every new object or update done
  },
  { typeKey: '$type' }
)

const Pet = mongoose.model('Pet', petSchema);

// export model
module.exports = Pet;
