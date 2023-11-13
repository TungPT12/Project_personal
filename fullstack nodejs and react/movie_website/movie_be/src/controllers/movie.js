const Movie = require('../models/Movies');
const Genre = require('../models/Genre');
const Video = require('../models/Video');

const paging = require('../utils/paging');

// movie can show for per page
const moviePerPage = 20;

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * Fail
 * return {
            page: 0,
            results: [],
            pageSize: 0,
        } when no movie
 *
 *
 * Fail
 * return {
            errors: `page must be less than or equal to ${total_pages}`,
            success: false
        } when page > total page
 *
 * Success
 * return originals movies
 */
exports.getOriginalsMovies = (req, res) => {
    const { page } = req.query;
    let movies = Movie.fetchAllMovie();
    const total_pages = Math.ceil(movies.length / moviePerPage);

    if (movies.length === 0) {
        return res.send(JSON.stringify({
            page: 0,
            results: [],
            pageSize: 0,
        }))
    }

    if (page > total_pages) {
        return res.send(JSON.stringify({
            errors: `page must be less than or equal to ${total_pages}`,
            success: false
        }));
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
    const results = paging(movies, moviePerPage, page)
    return res.send(JSON.stringify({
        page: page ? page : 1,
        results: results,
        total_pages: total_pages
    }))
}

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * Fail
 * return {
            page: 0,
            results: [],
            pageSize: 0,
        } when no movie
 *
 *
 * Fail
 * return {
            errors: `page must be less than or equal to ${total_pages}`,
            success: false
        } when page > total page
 *
 * Success
 * return trending movies
 */
exports.getTrendingMovies = (req, res) => {
    const { page } = req.query;
    let movies = Movie.fetchAllMovie();
    const total_pages = Math.ceil(movies.length / moviePerPage);

    if (movies.length === 0) {
        return res.send(JSON.stringify({
            page: 0,
            results: [],
            pageSize: 0,
        }))
    }

    if (page > total_pages) {
        return res.send(JSON.stringify({
            errors: `page must be less than or equal to ${total_pages}`,
            success: false
        }));
    }
    movies.sort((movie1, movie2) => {
        return movie2.popularity - movie1.popularity
    })
    const results = paging(movies, moviePerPage, page)
    return res.send(JSON.stringify({
        page: page ? page : 1,
        results: results,
        total_pages: total_pages
    }))
}

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * Fail
 * return {
            page: 0,
            results: [],
            pageSize: 0,
        } when no movie
 *
 *
 * Fail
 * return {
            errors: `page must be less than or equal to ${total_pages}`,
            success: false
        } when page > total page
 *
 * Success
 * return top rating movies
 */
exports.getTopRatingMovies = (req, res) => {
    const { page } = req.query;
    let movies = Movie.fetchAllMovie();
    const total_pages = Math.ceil(movies.length / moviePerPage);

    // khi không có novies trả về mảng rỗng
    if (movies.length === 0) {
        return res.send(JSON.stringify({
            page: 0,
            results: [],
            pageSize: 0,
        }))
    }

    // trường hợp khi page lớn total page
    if (page > total_pages) {
        return res.send(JSON.stringify({
            errors: `page must be less than or equal to ${total_pages}`,
            success: false
        }));
    }

    movies.sort((movie1, movie2) => {
        return movie2.vote_average - movie1.vote_average
    })
    const results = paging(movies, moviePerPage, page)
    return res.send(JSON.stringify({
        page: page ? page : 1,
        results: results,
        total_pages: total_pages
    }))
}

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * Fail
 * return {
            page: 0,
            results: [],
            pageSize: 0,
        } when no movie
 *
 *
 * Fail
 * return {
            errors: `page must be less than or equal to ${total_pages}`,
            success: false
        } when page > total page
 *
 * Fail
 * return {
            message: "Not found that genre id",
            success: false
        } when genre_id param not found
 *
 * Fail
 * return {
            message: "Not found genre param",
            success: false
        } when user don't send genre_id param
 *
 * Success
 * return movies by genre
 */
exports.getDiscoverMovies = (req, res) => {
    const page = req.query.page;
    const genre_id = req.query.genre;
    if (genre_id) {
        const genre = Genre.getGenre(parseInt(genre_id));
        if (genre) {
            let movies = Movie.getMoviesByType(genre.id);
            if (movies.length === 0) {
                return res.send(JSON.stringify({
                    page: 0,
                    results: [],
                    pageSize: 0,
                }))
            }
            const total_pages = Math.ceil(movies.length / moviePerPage);
            if (page > total_pages) {
                return res.send(JSON.stringify({
                    errors: `page must be less than or equal to ${total_pages}`,
                    success: false
                }));
            }
            const results = paging(movies, moviePerPage, page)
            return res.send(JSON.stringify({
                page: page ? page : 1,
                results: results,
                total_pages: total_pages
            }))
        }
        return res.status(400).send(JSON.stringify({
            message: "Not found that genre id",
            success: false
        }))
    }
    return res.status(400).send(JSON.stringify({
        message: "Not found genre param",
        success: false
    }))
}

/**
 *Get video by film id
 * @param {*} req
 * @param {*} res
 *
 * Fail
 * return{
        message: "Not found film_id param",
        success: false
    } when not film not exist
 *
 * Success
 * return video
 */
exports.getVideo = (req, res) => {
    const { film_id } = req.body;
    if (film_id) {
        const video = Video.getVideo(film_id)
        if (video) {
            return res.send(JSON.stringify(video))
        }
        return res.status(404).send(JSON.stringify())
    }
    return res.status(400).send(JSON.stringify({
        message: "Not found film_id param",
        success: false
    }))
}

/**
 *Search movie by key word and filter params
 * @param {*} req
 * @param {*} res
 *
 * Fail
 * return {
            page: 0,
            results: [],
            pageSize: 0,
        } when no movie
 *
 * Success
 * return movies was search
 */
exports.searchMovies = (req, res) => {
    try {
        const { keyword, page, genre, mediaType, year, language } = req.body;
        if (keyword) {
            let movies = Movie.searchMovies(keyword);
            if (movies) {
                if (movies.length === 0) {
                    return res.send(JSON.stringify({
                        page: 0,
                        results: [],
                        pageSize: 0,
                    }))
                }
                if (genre) {
                    movies = movies.filter((movie) => {
                        return movie.genre_ids.includes(genre)
                    })
                }
                if (mediaType) {
                    movies = movies.filter((movie) => {
                        return movie.media_type.includes(mediaType)
                    })
                }
                if (language) {
                    movies = movies.filter((movie) => {
                        return movie.original_language.includes(language)
                    })
                }
                if (year) {
                    movies = movies.filter((movie, index) => {
                        if (movie.release_date || movie.release_date === '') {
                            return movie.release_date.includes(year)
                        }
                        else {
                            return movie.first_air_date.includes(year)
                        }
                    })
                }
                const total_pages = Math.ceil(movies.length / moviePerPage);
                if (page > total_pages && page !== 1) {
                    return res.send(JSON.stringify({
                        errors: `page must be less than or equal to ${total_pages}`,
                        success: false
                    }));
                }
                const results = paging(movies, moviePerPage, page)
                return res.send(JSON.stringify({
                    page: page ? page : 1,
                    results: results,
                    total_pages: total_pages
                }))
            }
            return res.status(404).send(JSON.stringify({
                message: 'Not found movies!'
            }))
        }
        res.status(400).send(JSON.stringify({
            message: 'Not found keyword param!'
        }))
    } catch (error) {
        console.log(error)
        res.status(402).send(JSON.stringify(error))
    }
}

