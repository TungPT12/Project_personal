const express = require('express');
const chapterController = require('../../controllers/client/chapter');
const router = express.Router();

router.get('/chapters', chapterController.getChapters);
router.get('/manga/chapters/:id', chapterController.getChaptersByMangaId)

module.exports = router