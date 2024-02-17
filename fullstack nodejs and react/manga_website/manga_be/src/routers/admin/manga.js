const express = require('express');
const multer = require('multer');
const mangaController = require('../../controllers/admin/manga');
const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/manga', mangaController.createManga)
router.post('/upload-image', upload.single('image'), mangaController.uploadImage)

module.exports = router;