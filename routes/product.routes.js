const express = require('express');

//controllers
const productController = require('../controllers/product.controller');

//middlewares
const productMiddleware = require('../middlewares/product.middleware');
const validationsMiddleware = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(productController.findAll)
  .post(
    validationsMiddleware.createProductValidation,
    productController.create
  );

router
  .use('/:id', productMiddleware.productExist)
  .route('/:id')
  .get(productController.findOne)
  .patch(productController.update)
  .delete(productController.delete);
module.exports = router;
