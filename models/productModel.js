const mongoose = require('mongoose')
 
const Schema = mongoose.Schema

const productSchema = new Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photo: {
      type: String,
      required: true
  },
  details: [
    {
      label:{
        type: String,
        required: true
      },
      value:{
        type: String
      }
    },
    {
      label:{
        type: String,
        required: true
      },
      value:{
        type: String
      }
    }
  ]
})


// add a custom method to transform the returned object
// by replacing the default mongoose _id field with id
// and removing the __v version field
productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Product', productSchema)