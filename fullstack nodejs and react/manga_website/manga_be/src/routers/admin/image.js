const express = require('express');
const imageController = require('../../controllers/admin/image');
const router = express.Router();


router.post('/image', imageController.createImage)

module.exports = router;