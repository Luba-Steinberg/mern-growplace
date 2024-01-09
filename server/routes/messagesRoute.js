const router = require('express').Router()
const Message = require('../models/messageModel')
const User = require('../models/userModel')
const autMiddleware = require('../middlewares/autMiddleware')
const mongoose = require('mongoose')
const cloudinary = require('../config/cloudinaryConfig')
const multer = require('multer')
const path = require('path')

//create a message
router.post('/create-message', autMiddleware, async (req, res) => {
  const values = req.body
  console.log('the values are', values)
  try {
    const newMessage = new Message({
      message: values.message,
      product: values.productId,
      fromAuthor: values.messageAuthor,
      toSeller: values.seller,
    })
    console.log('the new messsage that goes to mongo db is', newMessage)
    await newMessage.save()
    res.send({
      success: true,
      message: 'The message was added successfully',
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    })
  }
})

//show all messages for a seller
router.post('/get-my-messages', async (req, res) => {
  try {
    const { seller } = req.body
    console.log('the seller in get-my-messages api call is', req.body)
    let filters = {}
    if (seller) {
      filters.toSeller = seller
    }
    const messages = await Message.find(filters)
      .populate('fromAuthor', 'name')
      .populate('product', 'name price image')
    // console.log('the products for messages are', messages.length);
    // for (i=0; i<4; i++) {
    //  console.log('product in message number ', i, 'is ', messages[i].product.name, ', the price is', messages[i].product.price)
    // }
    res.send({
      success: true,
      messages,
    })
  } catch (error) {
    res.send({
      success: false,
      messages: error.message,
    })
  }
})

//delete a message
router.delete('/delete-message/:id', autMiddleware, async (req, res) => {
  try {
    const messageId = req.params.id
    console.log('The message id to delete is', messageId)
    await Message.findByIdAndDelete(messageId)
    res.send({
      success: true,
      message: 'The message was deleted',
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    })
  }
})
module.exports = router
