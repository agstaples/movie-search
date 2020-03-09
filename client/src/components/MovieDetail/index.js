import React, { Fragment } from 'react'
import axios from 'axios'

class MovieDetail extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            displayMovie: {},
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`http://localhost:3001/api/tmdb/${id}`)
            .then(res => {
                const displayMovie = res.data
                this.setState({ displayMovie })
            })
    }

    getSimilarMoviesDropdown() {
        const movies = this.state.displayMovie.similar
        if (movies && movies.results) {
            return (
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {
                        Object.entries(movies.results).map((movie) => {
                            return (
                                <a key={movie[1].id}className="dropdown-item" href={`/${movie[1].id}`}>{movie[1].title} {movie[1].release_date && `(${movie[1].release_date.split('-')[0]})`}</a>
                            )
                        })        
                    }
                </div>
            )
        }
    }
  
    render() {
        const movie = this.state.displayMovie
        return (
            <Fragment>
                <div style={{
                        height: 'fit-content',
                        width: 'fit-content',
                        }}
                >
                    <div className="jumbotron jumbotron-image shadow" style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                        backgroundSize: 'cover',
                        overflow: 'hidden',
                        borderRadius: '0',
                        }}
                    >
                        <div style= {{
                            padding: '80px 40px 0px'
                            }}
                        >
                            <div className="mb-4 display-4 font-weight-bold text-center">
                                {movie.title}
                            </div>
                            <p className="mb-4">
                                {movie.overview}
                            </p>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            View Similar Movies
                        </button>
                        {this.getSimilarMoviesDropdown()}
                    </div>
                </div>
                <div>

                </div>
            </Fragment>
          )
    }
  }

export default MovieDetail