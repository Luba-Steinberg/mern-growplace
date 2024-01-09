const express = require('express')
const app = express()
app.use(express.json())
const dotenv = require('dotenv')
dotenv.config()

const dbConfig = require('./config/dbConfig')
const port = process.env.PORT || 5000
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
const usersRoute = require('./routes/usersRoute');
const productsRoute = require('./routes/productsRoute')
const messagesRoute = require('./routes/messagesRoute')
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
)
app.use('/', usersRoute);
app.use('/products', productsRoute);
app.use('/messages', messagesRoute)
app.use(cors())
app.use(bodyParser.json())
app.use(express.json({ limit: '2GB' }));
app.use(express.urlencoded({ limit: '2GB', extended: true }));

// app.use('/growplace/users', usersRoute);
var myCors = require('./cors')
app.use(myCors.permission)

app.listen(port, () => console.log(`NODE/Express started on port ${port}`))
