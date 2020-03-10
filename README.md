# Movie Search

This is a basic app that retrieves and displays information from [The Movie Database](https://developers.themoviedb.org/3/getting-started/introduction).

- [Introduction](#introduction)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
  - [Folder Structure](#folder-structure)
  - [Frameworks and Libraries](#frameworks-and-libraries)
  - [Basic Functionality](#basic-functionality)

## Introduction

This is a full stack [React](https://reactjs.org/) application with a [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) backend. Client side code is written in React and the backend API is written using Express. Both were built from scratch without the use of generators, such as create-react-app.

## Quick Start

You will need a TMDB API key to run the app locally, follow the instructions on the [TMDB](https://developers.themoviedb.org/3/getting-started/introduction) site to retrieve an api key.

```bash
# Clone the repository
git clone https://github.com/agstaples/movie-search

# Go inside the directory
cd movie-search

# Create and populate .env file with TMDB API key
cat > .env
# Then hit enter, then:
export TMDB_API_KEY=<your API key>
^D

# Check that your environmental variable saved
cat .env

# Source your .env file
source .env

# Install dependencies
yarn (or npm install)

# Go inside server directory
cd server

# Install client dependencies
yarn (or npm install)

# Install additional dependencies
yarn (or npm install) errorhandler express cors axios morgan dotenv

# Go inside client directory
cd ../client

# Install dependencies
yarn (or npm install)

# Start servers and build from within client directory
npm run dev
```

## Documentation

### Folder Structure

The project is split into a client and a server directory. All the frontend code (react, css, js and any other assets) will be in client directory. Backend Node.js/Express code will be in the server directory.

### Frameworks and Libraries

- [Babel](https://babeljs.io/)
- [Webpack](https://webpack.js.org/)
- [Nodemon](https://nodemon.io/)
- [Express](https://expressjs.com/)
- [Concurrently](https://github.com/kimmobrunfeldt/concurrently)
- [Prettier](https://prettier.io/)
- [Lodash](https://lodash.com/docs/)
- [Axios](https://github.com/axios/axios)

### Basic Functionality

The initial landing page displays a list of popular movies and a search bar. Search results are updated on a 500 milisecond delay using debounce as the user updates the search field.

Search results are cached in localStorage to avoid extraneous api calls.

Each entry in the list is a link to an individual movie's detail page, which displays basic information about the selected movie and allows users to view and select similar movies.
