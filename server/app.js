const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')
const axios = require('axios')

const isProduction = process.env.NODE_ENV === 'production'

const app = express()

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

if(!isProduction) {
  app.use(errorHandler())
  require('dotenv').load
}

// example url: https://api.themoviedb.org/3/movie/550?api_key=<<api_key>>
const TMDB_API_URL = 'https://api.themoviedb.org/3/movie/'
const TMDB_API_KEY = process.env.TMDB_API_KEY
const popularMoviesURL = `${TMDB_API_URL}popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`

app.get('/', (req, res) => {
    const { body } = req

    if (body.search_term) {
        const moviesByTitleURL = `${TMDB_API_URL}search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${body.search_term}&page=1&include_adult=false`
        axios.get(moviesByTitleURL)
            .then(response => res.send(response.data))
            .catch(error => console.log('Error', error))
    }
    axios.get(popularMoviesURL)
        .then(response => res.send(response.data))
        .catch(error => console.log('Error', error))
})

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
