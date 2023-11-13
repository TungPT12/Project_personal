const express = require('express');

const mediaController = require('../controllers/media');

const router = express.Router();

router.get('/api/movies/media', mediaController.getMedias)

module.exports = router