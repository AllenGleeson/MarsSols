const express = require('express');
const router = express.Router();
const { getMarsData } = require('../controllers/marsController');

router.get('/', getMarsData);

module.exports = router;