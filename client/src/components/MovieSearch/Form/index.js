import React, { Component, Fragment } from 'react'
import _ from 'lodash'

import { MovieList } from '../'

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchTitle: '',
        }

        this.delayedCallback = _.debounce(this.setSearchTitle, 500);
    }

    setSearchTitle(event) {
        this.setState({
            searchTitle: event.target.value,
        })
      }

    onChange(event) {
        event.persist()
        this.delayedCallback(event)
    }

    render() {
        return (
            <Fragment>
                <div className="col-12">
                    <input
                        className="form-control my-3"
                        placeholder="Search By Title"
                        onChange={this.onChange.bind(this)}
                    />
                </div>
                <MovieList
                    searchTitle={this.state.searchTitle}
                />
            </Fragment>
        )
    }
}

export default Form
