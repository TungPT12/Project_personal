const express = require('express');
const chapterController = require('../../controllers/admin/chapter');
const router = express.Router();


router.post('/chapter', chapterController.createChapter)

module.exports = router;