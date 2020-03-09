import React, { Component, Fragment } from 'react'

import { MovieList } from '../'

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchTitle: '',
        }

        this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this)
    }

    handleSearchFieldChange(event) {
        this.setState({
            searchTitle: event.target.value,
        })
    }

    render() {
        return (
            <Fragment>
                <div className="col-12 col-lg-6 offset-lg-3">
                    <input
                        className="form-control my-3"
                        placeholder="Search By Title"
                        onChange={(ev) => this.handleSearchFieldChange(ev)}
                    />
                    <button onClick={this.handleSubmit} className="btn btn-primary float-right">Submit</button>
                </div>
                <MovieList
                    searchTitle={this.state.searchTitle}
                />
            </Fragment>
        )
    }
}

export default Form
