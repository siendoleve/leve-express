const spentType = require('../controllers/spentType.controller');
const express = require('express');

const router = express.Router();

router.get('/', spentType.findAll);

module.exports = router;
