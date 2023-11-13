const fs = require('fs');
const path = require('path');
const findMovies = require('../utils/findMovie');


const SRC_PATH = require('../utils/path')

const MOVIE_DATA_PATH = path.join(SRC_PATH, 'data', 'movieList.json');

module.exports = class Movie {


    /**
     * 
     * @returns movies in movieList.json
     */
    static fetchAllMovie() {
        try {
            const movies = fs.readFileSync(MOVIE_DATA_PATH, 'utf8')
            return JSON.parse(movies)
        } catch (error) {
            return []
        }
    }

    /**
     * 
     * @param {*} genreId 
     * @returns movies found by genreId
     */
    static getMoviesByType(genreId) {
        try {
            const moviesJson = fs.readFileSync(MOVIE_DATA_PATH, 'utf8')
            const movies = JSON.parse(moviesJson);
            if (movies.length > 0) {
                const genreMovies = findMovies.findMoviesByGenre(genreId, movies);
                return genreMovies;
            } else {
                return []
            }
        } catch (error) {
            return []
        }
    }

    /**
     * 
     * @param {*} keyword 
     * @returns movies found by keyword
     */
    static searchMovies(keyword) {
        try {
            const moviesJson = fs.readFileSync(MOVIE_DATA_PATH, 'utf8')
            const movies = JSON.parse(moviesJson);
            if (movies.length > 0) {
                const searchResults = findMovies.findMoviesByKeyWord(keyword, movies)
                return searchResults;
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }
}