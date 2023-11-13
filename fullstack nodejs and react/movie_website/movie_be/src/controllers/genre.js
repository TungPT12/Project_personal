const Genre = require('../models/Genre');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Fail
 * return { message: "Not found genre"} when genre not found
 * 
 * Success
 * return data when genre found
 */
exports.getGenres = (req, res) => {
    const genres = Genre.fetchAllGenre();
    if (!genres || genres.length === 0) {
        return res.status(404).send(JSON.stringify({
            message: "Not found genre"
        }))
    }
    return res.send(JSON.stringify(genres))
}