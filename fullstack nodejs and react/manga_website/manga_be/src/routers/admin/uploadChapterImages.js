const express = require('express');
const multer = require('multer');
const uploadImagesController = require('../../controllers/admin/uploadChapterImages');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), uploadImagesController.uploadImages);

module.exports = router