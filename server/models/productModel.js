const mongoose = require('mongoose')
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
      required: true,
    },
    fromAge: {
      type: Number,
      required: true,
    },
    tillAge: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    materials: {
      type: String,
      required: true,
    },
    image: {
      type: Buffer,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  }
  // {timestamps: true},
)
module.exports = mongoose.model('products', productSchema)
