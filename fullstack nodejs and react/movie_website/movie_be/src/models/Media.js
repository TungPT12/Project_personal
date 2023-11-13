const fs = require('fs');
const path = require('path');

const SRC_PATH = require('../utils/path')

const MEDIA_DATA_PATH = path.join(SRC_PATH, 'data', 'mediaTypeList.json');

module.exports = class Media {

    /**
     * 
     * @returns data in mediaType.json
     */
    static fetchAllMedia() {
        try {
            const medias = fs.readFileSync(MEDIA_DATA_PATH, 'utf8')
            return JSON.parse(medias)
        } catch (error) {
            return []
        }
    }
}