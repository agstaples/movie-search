const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')
const cors = require('cors')

const isProduction = process.env.NODE_ENV === 'production'

const app = express()

app.use(cors())
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

if(!isProduction) {
  app.use(errorHandler())
  require('dotenv').load
}

app.use(require('./routes'))

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500)

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    })
  })
}

app.use((err, req, res) => {
  res.status(err.status || 500)

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  })
})

const server = app.listen(3001, () => console.log('Server started on http://localhost:3001'))
