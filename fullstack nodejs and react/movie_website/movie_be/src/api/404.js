
const express = require('express');

const notFoundRoute = require('../controllers/404')


const router = express.Router();

router.use(notFoundRoute);

module.exports = router