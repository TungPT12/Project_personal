const express = require('express');

const languageController = require('../controllers/language');

const router = express.Router();

router.get('/api/movies/language', languageController.getLanguage)

module.exports = router