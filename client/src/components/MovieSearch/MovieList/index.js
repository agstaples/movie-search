import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class MovieList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMovies: {}
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/tmdb`).then(res => {
      const displayMovies = res.data.results;
      this.setState({ displayMovies });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchTitle !== this.props.searchTitle) {
      const searchTitle = this.props.searchTitle;
      const cachedHits = JSON.parse(localStorage.getItem(searchTitle));

      if (cachedHits) {
        this.setState({ displayMovies: cachedHits });
      } else {
        axios
          .get(`http://localhost:3001/api/tmdb`, {
            params: {
              search_title: searchTitle
            }
          })
          .then(res => {
            const displayMovies = res.data.results;
            const stringifiedMovies = JSON.stringify(displayMovies);
            localStorage.setItem(searchTitle, stringifiedMovies);
            this.setState({ displayMovies });
          });
      }
    }
  }

  getMovies() {
    if (this.state.displayMovies) {
      const movies = this.state.displayMovies;
      return (
        <ul className="list-group">
          {Object.entries(movies).map(movie => {
            return (
              <Link to={`/${movie[1].id}`} key={movie[1].id}>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="w-75">
                      {movie[1].title}{" "}
                      {movie[1].release_date &&
                        `(${movie[1].release_date.split("-")[0]})`}
                    </div>
                    {movie[1].poster_path && (
                      <div className="image-parent">
                        <img
                          src={`https://image.tmdb.org/t/p/w200${movie[1].poster_path}`}
                          className="img-thumbnail float-right"
                          style={{ height: "60px" }}
                        />
                      </div>
                    )}
                  </li>
                </ul>
              </Link>
            );
          })}
        </ul>
      );
    }
  }

  render() {
    return (
      <div className="col-12">
        <h3>
          {this.props.searchTitle ? "Search Results:" : "Popular Movies:"}
        </h3>
        {this.getMovies()}
      </div>
    );
  }
}

export default MovieList;
