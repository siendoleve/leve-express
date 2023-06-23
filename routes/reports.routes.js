const reportController = require('../controllers/report.controller');
const express = require('express');

const router = express.Router();

router.get('/income', reportController.incomeReport);

router.get('/spent', reportController.spentsReport);

router.get('/buy', reportController.buysReport);

router.get('/economic-assets', reportController.economicAssetReport);

router.get('/profit', reportController.profitReport);

router.get('/report-reused-bottle', reportController.reportReusedBottle);

module.exports = router;
