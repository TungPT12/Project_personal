const fs = require('fs');

const path = require('path');

const SRC_PATH = require('../utils/path')

const VIDEO_DATA_PATH = path.join(SRC_PATH, 'data', 'videoList.json');

module.exports = class Video {

    /**
     * 
     * @param {*} idMovie 
     * @returns video by movie id
     */
    static getVideo(idMovie) {
        const moviesVideosJson = fs.readFileSync(VIDEO_DATA_PATH, 'utf-8');
        const moviesVideos = JSON.parse(moviesVideosJson);
        if (moviesVideos.length === 0) {
            return null;
        }
        const movieVideos = moviesVideos.find((movieVideos) => {
            return movieVideos.id == idMovie
        });
        if (!movieVideos) {
            return null;
        }
        const videos = movieVideos.videos.filter((movieVideo) => {
            return movieVideo.official === true && movieVideo.site === 'YouTube'
        })
        if (videos.length === 0) {
            return null;
        }
        if (videos.length === 1) {
            return videos[0];
        }
        videos.sort((a, b) => {
            return new Date(b.published_at) - new Date(a.published_at)
        })
        return videos[0]
    }
}