const mongoose = require('mongoose')

const env = require('dotenv')

env.config()

mongoose.connect(process.env.mongo_url, { useNewUrlParser: true })

const connection = mongoose.connection

connection.on('connected', () => {
  console.log('Mongo DB connection is Successful')
})

connection.on('error', (err) => {
  console.log('Mongo DB connection is failed')
})

module.exports = connection
