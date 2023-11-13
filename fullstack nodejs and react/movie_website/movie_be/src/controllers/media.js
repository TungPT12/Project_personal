const Media = require('../models/Media');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Fail
 * return { message: "Not found media"} when media not found
 * 
 * Success
 * return data when media found
 */
exports.getMedias = (req, res) => {
    const medias = Media.fetchAllMedia();
    if (!medias || medias.length === 0) {
        return res.status(404).send(JSON.stringify({
            message: "Not found media"
        }))
    }
    return res.send(JSON.stringify(medias))
}