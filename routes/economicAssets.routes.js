const express = require('express');

//controllers
const economicAssetsController = require('../controllers/economicAssets.controller');

//middlewares
const economicAssetsMiddleware = require('./../middlewares/economicAssets.middleware');
const validationMiddleware = require('./../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(economicAssetsController.findAll)
  .post(
    validationMiddleware.createEconomicAssetsValidation,
    economicAssetsController.create
  );

router
  .use('/:id', economicAssetsMiddleware.existEconomicAsset)
  .route('/:id')
  .get(economicAssetsController.findOne)
  .patch(economicAssetsController.update)
  .delete(economicAssetsController.delete);

module.exports = router;
