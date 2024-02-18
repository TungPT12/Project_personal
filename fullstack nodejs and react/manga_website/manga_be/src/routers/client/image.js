const express = require('express');
const imageController = require('../../controllers/client/image');
const router = express.Router();


router.get('/chapter/images/:chapterId', imageController.getImagesByChapterId)

module.exports = router;