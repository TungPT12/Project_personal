const Movie = require('../models/Movies');


/**
 *
 * @param {*} req
 * @param {*} res
 *
 *
 * Fail
 * return {
           message: 'Not found year'
        } when don't have any film
 *
 * Success
 * return  year of oldest movies and latest movie
 */
exports.getYear = (req, res) => {
    let movies = Movie.fetchAllMovie();

    if (movies.length === 0) {
        return res.send(JSON.stringify({
            message: 'Not found year'
        }))
    }

    movies.sort((movie1, movie2) => {
        if (movie1.release_date && movie2.release_date) {
            return new Date(movie2.release_date) - new Date(movie1.release_date)
        } else if (movie1.release_date) {
            return new Date(movie2.first_air_date) - new Date(movie1.release_date)
        } else if (movie2.release_date) {
            return new Date(movie2.release_date) - new Date(movie1.first_air_date)
        } else {
            return new Date(movie2.first_air_date) - new Date(movie1.first_air_date)
        }

    })
    const newYear = movies[0].release_date ? new Date(movies[0].release_date).getFullYear()
        : new Date(movies[0].first_air_date).getFullYear();

    const oldYear = movies[movies.length - 1].release_date ? new Date(movies[movies.length - 1].release_date).getFullYear()
        : new Date(movies[movies.length - 1]).first_air_date.getFullYear();

    let years = [];

    for (let i = oldYear; i <= newYear; i++) {
        years.push(i);
    }

    return res.send(JSON.stringify(years))
}