const express = require('express');
const multer = require('multer');
const uploadImageController = require('../../controllers/uploadImage');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload-image', upload.single('image'), uploadImageController.uploadImage);

module.exports = router