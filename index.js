// load environment variables from .env file into process.env
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// import product and user routes
const productRoutes = require('./routes/products')
const userRoutes = require('./routes/user')

// create a new express app
const app = express()

// middleware

app.use(express.static('build'))

// parse incoming request bodies in a middleware before your handlers
app.use(express.json())

// enable CORS (Cross-Origin Resource Sharing)
app.use(cors())

// log request path and method to the console
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// mount the product and user routes at the /api/products and /api/user paths
app.use('/api/products', productRoutes)
app.use('/api/user', userRoutes)

// route to handle root path requests
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

// MongoDB URI from the environment variable
const URI = process.env.REACT_APP_MONGODB_URI

// connect to the MongoDB server
mongoose.connect(URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      // print a message when the server is ready
      console.log('connected to db & listening on port', process.env.PORT || 4000)
    })
  })
  .catch((error) => {
    // print an error message if there was an issue connecting to the database
    console.log(error)
  })