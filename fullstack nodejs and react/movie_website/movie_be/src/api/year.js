const express = require('express');

const yearController = require('../controllers/year');

const router = express.Router();

router.get('/api/movies/year', yearController.getYear)

module.exports = router