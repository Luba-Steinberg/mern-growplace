const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    fromAuthor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    toSeller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    // image: {
    //   type: Buffer,
    // },
  }
  // {timestamps: true},
)
module.exports = mongoose.model('messages', messageSchema)
