const express = require('express');

//controllers
const buyController = require('../controllers/buy.controller');

//middlewares
const validationMiddleware = require('../middlewares/validations.middleware');
const buyMiddleware = require('../middlewares/buy.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(buyController.findAll)
  .post(validationMiddleware.createBuyValidation, buyController.create);

router.get('/product/:type', buyController.findAllByType);

router.get('/client/:name', buyController.findAllByClient);

router
  .use('/:id', buyMiddleware.existBuy)
  .route('/:id')
  .get(buyController.findOne)
  .patch(buyController.update)
  .delete(buyController.delete);

module.exports = router;
