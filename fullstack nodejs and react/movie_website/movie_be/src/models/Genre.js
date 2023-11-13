const fs = require('fs');
const path = require('path');

const SRC_PATH = require('../utils/path')

const GENRE_DATA_PATH = path.join(SRC_PATH, 'data', 'genreList.json');

module.exports = class Genre {

    /**
     * 
     * @returns data in genre.json
     */
    static fetchAllGenre() {
        try {
            const genres = fs.readFileSync(GENRE_DATA_PATH, 'utf8')
            return JSON.parse(genres)
        } catch (error) {
            return []
        }
    }

    /**
     * 
     * @param {*} genreId 
     * @returns genre found by id
     */
    static getGenre(genreId) {
        try {
            let genres = fs.readFileSync(GENRE_DATA_PATH, 'utf8')
            genres = JSON.parse(genres)
            const genre = genres.find((genre) => {
                return genre.id === genreId;
            })
            return genre;
        } catch (error) {
            console.log(error)
            return null
        }
    }
}