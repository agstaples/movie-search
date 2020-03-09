import React, { Fragment } from 'react'
import NumberFormat from 'react-number-format'
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
        const movieBudget = movie.budget > 0
            ? movie.budget
            : "Budget information not available"
        const movieRevenue = movie.revenue > 0
            ? movie.revenue
            : "Revenue information not available"
        return (
            <Fragment>
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
                <div className="col-12">
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ margin: "10px 0"}}>
                            View Similar Movies
                        </button>
                        {this.getSimilarMoviesDropdown()}
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Runtime: {movie.runtime} min</li>
                        <li className="list-group-item">Budget: <NumberFormat value={movieBudget} displayType={'text'} thousandSeparator={true} prefix={'$'} /></li>
                        <li className="list-group-item">Revenue: <NumberFormat value={movieRevenue} displayType={'text'} thousandSeparator={true} prefix={'$'} /></li>
                        <li className="list-group-item"><a href={`https://www.imdb.com/title/${movie.imdb_id}/`}>IMDB</a></li>
                    </ul>
                </div>
            </Fragment>
          )
    }
  }

export default MovieDetail
