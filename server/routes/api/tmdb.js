const router = require("express").Router();
const axios = require("axios");

const TMDB_API_URL = "https://api.themoviedb.org/3/";
const TMDB_API_KEY = process.env.TMDB_API_KEY
const popularMoviesURL = `${TMDB_API_URL}movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

router.get("/", (req, res) => {
  if (req.query["search_title"]) {
    const moviesByTitleURL = `${TMDB_API_URL}search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${req.query["search_title"]}&page=1&include_adult=false`;
    axios
      .get(moviesByTitleURL)
      .then(response => res.send(response.data))
      .catch(error => console.log("Error", error));
  } else {
    axios
      .get(popularMoviesURL)
      .then(response => res.send(response.data))
      .catch(error => console.log("Error", error));
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const movieByTitleURL = `${TMDB_API_URL}movie/${id}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=similar`;
  axios
    .get(movieByTitleURL)
    .then(response => res.send(response.data))
    .catch(error => console.log("Error", error));
});

module.exports = router;
