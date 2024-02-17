const express = require('express');
const mangaController = require('../../controllers/client/manga');
const router = express.Router();

router.get('/mangas', mangaController.getMangas);

module.exports = router