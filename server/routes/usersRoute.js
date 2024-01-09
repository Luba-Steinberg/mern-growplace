const router = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const autMiddleware = require('../middlewares/autMiddleware')
// new user registration
router.get('/register', jsonParser, function (req, res) {
  // save user
  // router.get('/register', jsonParser, function (req, res) {
  var myVar = 'hi'
  res.send(myVar)
  // })
})
router.post('/register', jsonParser, async function (req, res) {
  //user registration
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user)
      return res.status(400).json({ message: 'The user already exists' })
    const myPassword = req.body.password
    const hashedPassword = await bcrypt.hash(myPassword, 10)
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const myDate = [year, month, day].join('/')
    console.log(typeof myDate)
    const myParams = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      lastvisit: myDate,
    }
    const newUser = new User(myParams)
    newUser.save()
    console.log(
      'the name is ',
      newUser.name,
      'the id is ',
      newUser._id,
      'the email is ',
      newUser.email,
      'the password is ',
      newUser.password,
      'last visit on ',
      newUser.lastvisit
    )
    // const message = await json({
    //   message: 'The user was created seccessfully',
    // })
    // const token = jwt.sign({ userId: newUser._id }, process.env.jwt_secret)
    const userName = newUser.name
    const lastUserVisit = newUser.lastvisit
    //what i send
    //message, token, , lastVisit
    console.log(
      'the name to be sent is',
      userName,
      'the date to be sent is',
      lastUserVisit
    )
    res.send({ userName, lastUserVisit })
  } catch (error) {
    res.send(error)
  }
})
//user login
router.post('/login', jsonParser, async (req, res) => {
  //   // check if user exists
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).send({ message: 'User not found' })
    }
    const enteredPassword = req.body.password
    console.log(
      'Enterd password',
      enteredPassword,
      'the type is ',
      typeof enteredPassword
    )
    const usersPassword = user.password
    console.log(
      'User password in the database',
      usersPassword,
      'the type is ',
      typeof usersPassword
    )
    const isValidPassword = await bcrypt.compare(enteredPassword, usersPassword)
    console.log('Password match', isValidPassword)
    if (!isValidPassword) {
      return res.status(401).send({ message: 'Invalid password' })
    }
    // async function myDateChange () {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const myDate = [year, month, day].join('/')
    await User.updateOne({ _id: user.id }, { lastvisit: myDate })
    console.log(myDate, user.id)
    // }
    //create and assign token
    const token = jwt.sign({ userId: user.id }, process.env.jwt_secret, {
      expiresIn: '1d',
    })
    const userName = user.name
    const lastVisit = user.lastvisit
    console.log(token, userName, lastVisit)
    res.send({
      success: true,
      message: 'The user logged in successfully',
      data: token,
      name: userName,
      lastVisit: lastVisit,
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
})
//get current user
router.get('/get-current-user', autMiddleware, async (req, res) => {
  try {
    // find the user
    const user = await User.findById(req.body.userId)
    console.log('the user info is ', user)
    res.send({
      success: true,
      message: 'User fetched successfully',
      data: user,
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    })
  }
})

module.exports = router
