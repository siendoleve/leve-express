const express = require('express');

const typeLotController = require('../controllers/typeLot.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.get('/', typeLotController.findAll);

module.exports = router;
