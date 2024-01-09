const router = require('express').Router()
const Product = require('../models/productModel')
const User = require('../models/userModel')
const autMiddleware = require('../middlewares/autMiddleware')
const mongoose = require('mongoose')
const cloudinary = require('../config/cloudinaryConfig')
const multer = require('multer')
const path = require('path')

//add a new product
router.post('/add-product', autMiddleware, async (req, res) => {
  try {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.send({
      success: true,
      message: 'The product was added successfully',
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    })
  }
})

// get all products
router.post('/get-products', async (req, res) => {
  try {
    const { seller, category, 
      user 
    } = req.body
    console.log(
      'the seller is',
      req.body.seller,
      'the category is',
      req.body.category,
      'the user is',
      req.body.user
    )
    let filters = {}
    if (seller) {
      filters.seller = seller
    }
    if (category) {
      filters.category = category
      // exclude products of the current user:
      filters.seller = { $ne: user }
    }
    const products = await Product.find(filters).populate('seller', 'name')
    // console.log(products)
    // const sellerName = await User.findById(messageAuthor)
    // console.log('the sellerName is', sellerName)
    res.send({
      success: true,
      products,
      // sellerName: sellerName.name,
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    })
  }
})

//edit a product
router.put('/edit-product', autMiddleware, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      oldPrice: req.body.oldPrice,
      fromAge: req.body.fromAge,
      tillAge: req.body.tillAge,
      category: req.body.category,
      materials: req.body.materials,
    })
    console.log('The params to update are', req.body)
    console.log('updatedProduct is', updatedProduct)
    res.send({
      success: true,
      message:
        'Product updated successfully, the details are ${updatedProduct}',
      updatedProduct: updatedProduct,
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    })
  }
})

//delete a product
router.delete('/delete-product/:id', autMiddleware, async (req, res) => {
  try {
    const productId = req.params.id
    console.log('The id to delete is', productId)
    await Product.findByIdAndDelete(productId)
    res.send({
      success: true,
      message: 'The product was deleted',
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    })
  }
})

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024 * 1024,
  },
  fileFilter: function (req, file, cb) {
    const fileName = file.originalname
    console.log('the name of the file in multer is', fileName)
    const valid = ['.jpg', '.png', '.jpeg'].find((ext) =>
      fileName.endsWith(ext)
    )
    cb(null, valid)
  },
}).single('file')

router.post(
  '/upload-image-to-product/:id',
  autMiddleware,
  imageUpload,
  async (req, res) => {
    console.log('the file is', req.file)
    console.log('the selected product id is:', req.params.id)
    if (!req.file) {
      console.log('No file received')
    }
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        image: req.file.buffer,
      })
      res.send({
        success: true,
        message: 'The product was deleted',
      })
      // res.status(200).send('File uploaded successfully', updatedProduct)
    } catch (error) {
      console.log('Error', error)
      return res.status(500).send('error uploading file')
    }
  }
)

module.exports = router
