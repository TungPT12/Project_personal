const express = require('express');
const typeController = require('../../controllers/client/type');
const router = express.Router();

router.get('/types', typeController.getTypes);

module.exports = router