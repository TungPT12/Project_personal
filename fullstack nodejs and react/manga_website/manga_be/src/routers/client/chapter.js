const express = require('express');
const chapterController = require('../../controllers/client/chapter');
const router = express.Router();

router.get('/chapters', chapterController.getChapters);

module.exports = router